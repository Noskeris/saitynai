using System.Text.Json.Serialization;
using MediatR;

namespace saitynai_backend.Mediator.Commands.Events;

public class DeleteEventCommand : IRequest
{
    [JsonIgnore]
    public string UserId { get; set; } = "";
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
}