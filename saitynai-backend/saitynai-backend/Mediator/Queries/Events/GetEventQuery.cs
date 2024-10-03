using MediatR;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Queries.Events;

public class GetEventQuery : IRequest<EventResponse>
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
}