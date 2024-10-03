using MediatR;
using saitynai_backend.Mediator.Queries.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class GetEventHandler : IRequestHandler<GetEventQuery, EventResponse>
{
    public Task<EventResponse> Handle(GetEventQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}