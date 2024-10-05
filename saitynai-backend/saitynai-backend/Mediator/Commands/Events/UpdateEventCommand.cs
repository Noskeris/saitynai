using MediatR;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Mediator.Commands.Events;

public class UpdateEventCommand : IRequest<EventResponse>
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Requirements { get; set; }
}