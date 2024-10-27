using MediatR;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Queries.Events;

public class GetEventsQuery : IRequest<EventsResponse>
{
    public int OrganizationId { get; set; }
    public string? OrganizerId { get; set; }
}