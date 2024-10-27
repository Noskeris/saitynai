using MediatR;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Queries.TimeSlots;

public class GetTimeSlotsQuery : IRequest<TimeSlotsResponse>
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public string? OrganizerId { get; set; }
}