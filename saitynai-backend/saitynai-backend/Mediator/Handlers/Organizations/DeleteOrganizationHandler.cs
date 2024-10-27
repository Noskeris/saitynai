using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class DeleteOrganizationHandler : IRequestHandler<DeleteOrganizationCommand>
{
    private readonly Context _context;

    public DeleteOrganizationHandler(Context context)
    {
        _context = context;
    }

    public async Task Handle(DeleteOrganizationCommand request, CancellationToken cancellationToken)
    {
        var organization = _context.Organizations
            .Include(x => x.Events)
            .ThenInclude(x => x.TimeSlots)
            .FirstOrDefault(x => x.Id == request.OrganizationId);
        
        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }

        if (organization.UserId != request.UserId)
        {
            throw new ForbiddenException("Cannot delete organization that does not belong to you");
        }
        
        if (organization.Events.
            Any(e => e.TimeSlots
                .Any(ts => 
                    !ts.IsCancelled
                    && ts.StartTime > DateTime.Now)))
        {
            throw new ConflictException("Cannot delete organization with active time slots");
        }

        organization.Events.ForEach(e => e.TimeSlots.ForEach(ts => ts.Participants.RemoveAll(_ => true)));
        
        _context.Organizations.Remove(organization);
        
        await _context.SaveChangesAsync(cancellationToken);
    }
}