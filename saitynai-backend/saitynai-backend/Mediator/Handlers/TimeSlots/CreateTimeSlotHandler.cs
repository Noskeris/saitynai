using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.TimeSlots;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class CreateTimeSlotHandler : IRequestHandler<CreateTimeSlotCommand, TimeSlotResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public CreateTimeSlotHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TimeSlotResponse> Handle(CreateTimeSlotCommand request, CancellationToken cancellationToken)
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
        
        if (organization.UserId != request.UserId)
        {
            throw new ForbiddenException("Cannot create timeslot for another organization");
        }
        
        var @event = organization.Events.FirstOrDefault(e => e.Id == request.EventId);
        
        if (@event == null)
        {
            throw new NotFoundException("Event not found");
        }
        
        if (@event.TimeSlots.Any(ts =>
                !ts.IsCancelled
                && ts.StartTime < request.EndTime
                && ts.EndTime > request.StartTime))
        {
            throw new ConflictException("Time slot interferes with other event's time slots");
        }
        
        var timeSlot = _mapper.Map<TimeSlot>(request);
        
        _context.TimeSlots.Add(timeSlot);
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<TimeSlotResponse>(timeSlot);
    }
}