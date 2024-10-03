using MediatR;

namespace saitynai_backend.Mediator.Commands.Events;

public class DeleteEventCommand : IRequest
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
}