using MediatR;

namespace saitynai_backend.Mediator.Commands.Events;

public class DeleteEventCommand : IRequest
{
    public string UserId { get; set; }
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
}