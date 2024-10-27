using MediatR;

namespace saitynai_backend.Mediator.Commands.TimeSlots;

public class DeleteTimeSlotCommand : IRequest
{
    public string? UserId { get; set; }
    public int OrganizationId { get; set; }
    public int EventId { get; set; }
    public int TimeSlotId { get; set; }
}