using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class CreateTimeSlotHandler : IRequestHandler<CreateTimeSlotCommand>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public CreateTimeSlotHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task Handle(CreateTimeSlotCommand request, CancellationToken cancellationToken)
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
        
        if (@event.TimeSlots.Any(ts => 
                ts.StartTime < request.StartTime 
                && ts.EndTime > request.StartTime))
        {
            throw new ConflictException("TimeSlot interferes with other timeslots");
        }
        
        var timeSlot = _mapper.Map<TimeSlot>(request);
        
        _context.TimeSlots.Add(timeSlot);
        
        await _context.SaveChangesAsync(cancellationToken);
    }
}