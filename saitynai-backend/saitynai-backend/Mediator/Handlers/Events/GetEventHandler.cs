using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Queries.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class GetEventHandler : IRequestHandler<GetEventQuery, EventResponse>
{
    private readonly IMapper _mapper;
    private readonly Context _context;

    public GetEventHandler(IMapper mapper, Context context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<EventResponse> Handle(GetEventQuery request, CancellationToken cancellationToken)
    {
        var organization = _context.Organizations
            .Include(o => o.Events)
            .FirstOrDefault(o => o.Id == request.OrganizationId);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }

        var @event = organization.Events.FirstOrDefault(e => e.Id == request.EventId);

        if (@event == null)
        {
            throw new NotFoundException("Event not found");
        }

        return _mapper.Map<EventResponse>(@event);
    }
}