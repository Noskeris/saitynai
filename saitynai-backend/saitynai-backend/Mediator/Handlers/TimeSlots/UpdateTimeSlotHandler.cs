using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.TimeSlots;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class UpdateTimeSlotHandler : IRequestHandler<UpdateTimeSlotCommand, TimeSlotResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public UpdateTimeSlotHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TimeSlotResponse> Handle(UpdateTimeSlotCommand request, CancellationToken cancellationToken)
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
        
        var timeSlot = @event.TimeSlots.FirstOrDefault(ts => ts.Id == request.TimeSlotId);
        
        if (timeSlot == null)
        {
            throw new NotFoundException("TimeSlot not found");
        }
        
        if (@event.TimeSlots.Any(ts => 
                ts.Id != request.TimeSlotId 
                && ts.StartTime < request.StartTime 
                && ts.EndTime > request.StartTime))
        {
            throw new ConflictException("TimeSlot interferes with other timeslots");
        }
        
        _mapper.Map(request, timeSlot);
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<TimeSlotResponse>(timeSlot);
    }
}