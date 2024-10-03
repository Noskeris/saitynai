using MediatR;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Queries.TimeSlots;

public class GetTimeSlotQuery : IRequest<TimeSlotResponse>
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public int TimeSlotId { get; set; }
}