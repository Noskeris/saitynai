using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Participants;

namespace saitynai_backend.Mediator.Handlers.Participants;

public class AddParticipantHandler : IRequestHandler<AddParticipantCommand>
{
    private readonly Context _context;

    public AddParticipantHandler(Context context)
    {
        _context = context;
    }

    public async Task Handle(AddParticipantCommand request, CancellationToken cancellationToken)
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
        
        if (timeSlot.Participants.Any(p => p.Id == request.UserId))
        {
            throw new ConflictException("User is already a participant");
        }

        if (timeSlot.IsCancelled || timeSlot.StartTime < DateTime.Now)
        {
            throw new ConflictException("Time slot is not available for registration");
        }

        if (timeSlot.MaxParticipants is not null && timeSlot.Participants.Count >= timeSlot.MaxParticipants)
        {
            throw new ConflictException("Time slot is full");
        }
        
        var user = _context.Users.First(x => x.Id == request.UserId);
        
        timeSlot.Participants.Add(user);
        _context.TimeSlots.Update(timeSlot);
        await _context.SaveChangesAsync(cancellationToken);
    }
}