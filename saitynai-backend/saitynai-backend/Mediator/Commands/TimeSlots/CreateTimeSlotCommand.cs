using MediatR;

namespace saitynai_backend.Mediator.Commands.TimeSlots;

public class CreateTimeSlotCommand : IRequest
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAvailable { get; set; }
}