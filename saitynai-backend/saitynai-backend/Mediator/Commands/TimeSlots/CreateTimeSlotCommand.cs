using MediatR;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Commands.TimeSlots;

public class CreateTimeSlotCommand : IRequest<TimeSlotResponse>
{
    public string? UserId { get; set; }
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAvailable { get; set; }
    public int? MaxParticipants { get; set; }
}