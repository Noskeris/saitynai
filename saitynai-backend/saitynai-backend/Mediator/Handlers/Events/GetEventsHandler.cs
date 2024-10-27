using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Queries.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class GetEventsHandler : IRequestHandler<GetEventsQuery, EventsResponse>
{
    private readonly IMapper _mapper;
    private readonly Context _context;

    public GetEventsHandler(IMapper mapper, Context context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<EventsResponse> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        var organization = _context.Organizations
            .Include(o => o.Events)
            .FirstOrDefault(o => o.Id == request.OrganizationId);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }
        
        if (request.OrganizerId != null && organization.UserId != request.OrganizerId)
        {
            throw new ForbiddenException("Organizers are not allowed to view other organizations");
        }

        return _mapper.Map<EventsResponse>(organization.Events.OrderBy(x => x.Name));
    }
}