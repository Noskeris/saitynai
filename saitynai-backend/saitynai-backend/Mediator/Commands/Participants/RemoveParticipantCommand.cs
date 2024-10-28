using System.Text.Json.Serialization;
using MediatR;

namespace saitynai_backend.Mediator.Commands.Participants;

public class RemoveParticipantCommand : IRequest
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public int TimeSlotId { get; set; }
    [JsonIgnore]
    public string UserId { get; set; } = "";
    public string? OrganizerId { get; set; }
}