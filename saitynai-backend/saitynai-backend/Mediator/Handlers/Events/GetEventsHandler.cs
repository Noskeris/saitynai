using MediatR;
using saitynai_backend.Mediator.Queries.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class GetEventsHandler : IRequestHandler<GetEventsQuery, EventsResponse>
{
    public Task<EventsResponse> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}