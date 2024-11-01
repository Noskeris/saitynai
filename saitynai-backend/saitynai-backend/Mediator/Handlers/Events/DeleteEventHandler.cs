using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class DeleteEventHandler : IRequestHandler<DeleteEventCommand>
{
    private readonly Context _context;

    public DeleteEventHandler(Context context)
    {
        _context = context;
    }
    
    public async Task Handle(DeleteEventCommand request, CancellationToken cancellationToken)
    {
        var organization = _context.Organizations
            .Include(o => o.Events)
            .ThenInclude(o => o.TimeSlots)
            .ThenInclude(o => o.Participants)
            .FirstOrDefault(o => o.Id == request.OrganizationId);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }
        
        if (organization.UserId != request.UserId)
        {
            throw new ForbiddenException("Cannot delete event of another organization");
        }

        var @event = organization.Events.FirstOrDefault(e => e.Id == request.EventId);

        if (@event == null)
        {
            throw new NotFoundException("Event not found");
        }

        if (@event.TimeSlots.Any(ts => 
                !ts.IsCancelled
                && ts.StartTime > DateTime.Now))
        {
            throw new ConflictException("Cannot delete event with active time slots");
        }
        
        @event.TimeSlots.ForEach(x => x.Participants.RemoveAll(_ => true));

        _context.Events.Remove(@event);

        await _context.SaveChangesAsync(cancellationToken);
    }
}