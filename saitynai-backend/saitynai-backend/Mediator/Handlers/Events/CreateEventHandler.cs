using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class CreateEventHandler : IRequestHandler<CreateEventCommand, EventResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public CreateEventHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<EventResponse> Handle(CreateEventCommand request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .Include(o => o.Events)
            .FirstOrDefaultAsync(o => o.Id == request.OrganizationId,
                cancellationToken);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }

        if (organization.Events.Any(e => e.Name.ToLower() == request.Name.ToLower()))
        {
            throw new ConflictException("Event with this name already exists");
        }

        var @event = _mapper.Map<Event>(request);

        organization.Events.Add(@event);

        await _context.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<EventResponse>(@event);
    }
}