using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Queries.TimeSlots;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class GetTimeSlotHandler : IRequestHandler<GetTimeSlotQuery, TimeSlotResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public GetTimeSlotHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TimeSlotResponse> Handle(GetTimeSlotQuery request, CancellationToken cancellationToken)
    {
        var timeSlot = await _context.TimeSlots
            .Include(ts => ts.Event)
            .ThenInclude(e => e.Organization)
            .FirstOrDefaultAsync(ts => ts.Id == request.TimeSlotId, cancellationToken);

        if (timeSlot == null)
        {
            throw new NotFoundException("Time slot not found");
        }

        return _mapper.Map<TimeSlotResponse>(timeSlot);
    }
}