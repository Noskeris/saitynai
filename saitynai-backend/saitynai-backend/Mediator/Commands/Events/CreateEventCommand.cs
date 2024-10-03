using MediatR;

namespace saitynai_backend.Mediator.Commands.Events;

public class CreateEventCommand : IRequest
{
    public int OrganizationId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public string Requirements { get; set; }
}