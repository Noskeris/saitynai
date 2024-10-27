using MediatR;
using saitynai_backend.Models.Participants;

namespace saitynai_backend.Mediator.Queries.Participants;

public class GetParticipantsQuery : IRequest<ParticipantsResponse>
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public int TimeSlotId { get; set; }
    public string OrganizerId { get; set; }
}