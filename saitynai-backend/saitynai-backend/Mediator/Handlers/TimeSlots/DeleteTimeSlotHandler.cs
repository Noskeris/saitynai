using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class DeleteTimeSlotHandler : IRequestHandler<DeleteTimeSlotCommand>
{
    private readonly Context _context;

    public DeleteTimeSlotHandler(Context context)
    {
        _context = context;
    }

    public async Task Handle(DeleteTimeSlotCommand request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .Include(o => o.Events)
            .ThenInclude(o => o.TimeSlots)
            .ThenInclude(timeSlot => timeSlot.Participants)
            .FirstOrDefaultAsync(o => o.Id == request.OrganizationId,
                cancellationToken);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }
        
        if (organization.UserId != request.UserId)
        {
            throw new ForbiddenException("Cannot delete timeslot of another organization");
        }
        
        var @event = organization.Events.FirstOrDefault(e => e.Id == request.EventId);
        
        if (@event == null)
        {
            throw new NotFoundException("Event not found");
        }
        
        var timeSlot = @event.TimeSlots.FirstOrDefault(ts => ts.Id == request.TimeSlotId);

        if (timeSlot == null)
        {
            throw new NotFoundException("Time slot not found");
        }

        timeSlot.Participants.RemoveAll(_ => true);
        _context.TimeSlots.Update(timeSlot);
        await _context.SaveChangesAsync(cancellationToken);
        
        _context.TimeSlots.Remove(timeSlot);
        await _context.SaveChangesAsync(cancellationToken);
    }
}