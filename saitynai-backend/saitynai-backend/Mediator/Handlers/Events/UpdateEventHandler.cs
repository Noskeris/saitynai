using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class UpdateEventHandler : IRequestHandler<UpdateEventCommand, EventResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public UpdateEventHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<EventResponse> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .Include(o => o.Events)
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

        if (organization.Events.Any(e => e.Id != request.EventId && e.Name.ToLower() == request.Name.ToLower()))
        {
            throw new ConflictException("Event with this name already exists");
        }
    
        _mapper.Map(request, @event);

        await _context.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<EventResponse>(@event);
    }

}