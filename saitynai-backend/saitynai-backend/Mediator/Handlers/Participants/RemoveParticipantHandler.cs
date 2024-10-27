using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Participants;

namespace saitynai_backend.Mediator.Handlers.Participants;

public class RemoveParticipantHandler : IRequestHandler<RemoveParticipantCommand>
{
    private readonly Context _context;

    public RemoveParticipantHandler(Context context)
    {
        _context = context;
    }

    public async Task Handle(RemoveParticipantCommand request, CancellationToken cancellationToken)
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
        
        if (request.OrganizerId != null && organization.UserId != request.OrganizerId)
        {
            throw new ForbiddenException("Organizers are not allowed to handle other organizations");
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
        
        if (timeSlot.Participants.All(p => p.Id != request.UserId))
        {
            throw new ConflictException("User is not a participant");
        }
        
        var user = _context.Users.First(x => x.Id == request.UserId);
        
        timeSlot.Participants.Remove(user);
        _context.TimeSlots.Update(timeSlot);
        await _context.SaveChangesAsync(cancellationToken);
    }
}