using MediatR;

namespace saitynai_backend.Mediator.Commands.Participants;

public class AddParticipantCommand : IRequest
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public int TimeSlotId { get; set; }
    public string UserId { get; set; }
}