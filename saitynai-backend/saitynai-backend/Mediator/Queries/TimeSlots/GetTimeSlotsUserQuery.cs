using MediatR;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Queries.TimeSlots;

public class GetTimeSlotsUserQuery : IRequest<TimeSlotsUserResponse>
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public string? UserId { get; set; }
}