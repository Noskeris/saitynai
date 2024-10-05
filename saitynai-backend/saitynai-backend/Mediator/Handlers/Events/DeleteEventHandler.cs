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
            .FirstOrDefault(o => o.Id == request.OrganizationId);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
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
            throw new ConflictException("Cannot delete event with active timeslots");
        }

        _context.Events.Remove(@event);

        await _context.SaveChangesAsync(cancellationToken);
    }
}