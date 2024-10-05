using MediatR;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Mediator.Commands.TimeSlots;
using saitynai_backend.Mediator.Queries.TimeSlots;
using saitynai_backend.Validators;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events/{eventId}/time-slots")]
[ValidationFilter]
public class TimeSlotController : ControllerBase
{
    private readonly IMediator _mediator;

    public TimeSlotController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetTimeSlots(
        int organizationId,
        int eventId)
    {
        var request = new GetTimeSlotsQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId
        };

        var result = await _mediator.Send(request);
        return Ok(result);
    }

    [HttpGet]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> GetTimeSlot(
        int organizationId,
        int eventId,
        int timeSlotId)
    {
        var request = new GetTimeSlotQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId
        };

        var result = await _mediator.Send(request);
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateTimeSlot(
        int organizationId,
        int eventId,
        [FromBody] CreateTimeSlotCommand command)
    {
        command.OrganizationId = organizationId;
        command.EventId = eventId;
        
        var timeSlot = await _mediator.Send(command);
        return Created($"api/v1/organizations/{organizationId}/events/{eventId}/time-slots/{timeSlot.Id}", timeSlot);
    }
    
    [HttpPut]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> UpdateTimeSlot(
        int organizationId,
        int eventId,
        int timeSlotId,
        [FromBody] UpdateTimeSlotCommand command)
    {
        command.OrganizationId = organizationId;
        command.EventId = eventId;
        command.TimeSlotId = timeSlotId;
        
        var timeSlot = await _mediator.Send(command);
        return Ok(timeSlot);
    }
    
    [HttpDelete]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> DeleteTimeSlot(
        int organizationId,
        int eventId,
        int timeSlotId)
    {
        var command = new DeleteTimeSlotCommand()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId
        };
        await _mediator.Send(command);
        return NoContent();
    }
}