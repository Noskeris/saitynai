using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Queries.TimeSlots;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class GetTimeSlotsUserHandler : IRequestHandler<GetTimeSlotsUserQuery, TimeSlotsUserResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public GetTimeSlotsUserHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TimeSlotsUserResponse> Handle(GetTimeSlotsUserQuery request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .Include(o => o.Events)
            .ThenInclude(o => o.TimeSlots)
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
        
        return _mapper.Map<TimeSlotsUserResponse>(@event.TimeSlots, opts =>
        {
            opts.Items["UserId"] = request.UserId;
        });
    }
}