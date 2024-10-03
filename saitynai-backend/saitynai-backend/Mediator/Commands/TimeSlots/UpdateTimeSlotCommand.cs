using MediatR;

namespace saitynai_backend.Mediator.Commands.TimeSlots;

public class UpdateTimeSlotCommand : IRequest
{
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public int TimeSlotId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastModifiedAt { get; set; }
    public bool IsAvailable { get; set; }
    public bool IsCancelled { get; set; }
}