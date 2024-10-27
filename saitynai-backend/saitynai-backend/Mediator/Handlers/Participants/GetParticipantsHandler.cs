using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Queries.Participants;
using saitynai_backend.Models.Participants;

namespace saitynai_backend.Mediator.Handlers.Participants;

public class GetParticipantsHandler : IRequestHandler<GetParticipantsQuery, ParticipantsResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public GetParticipantsHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ParticipantsResponse> Handle(GetParticipantsQuery request, CancellationToken cancellationToken)
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
            throw new ForbiddenException("Organizers are not allowed to view other organizations");
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
        
        return _mapper.Map<ParticipantsResponse>(timeSlot.Participants);
    }
}