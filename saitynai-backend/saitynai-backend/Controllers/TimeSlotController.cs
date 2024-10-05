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
    public async Task<IActionResult> GetTimeSlots(int organizationId, int eventId)
    {
        try
        {
            var request = new GetTimeSlotsQuery()
            {
                OrganizationId = organizationId,
                EventId = eventId
            };

            var result = await _mediator.Send(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> GetTimeSlot(int organizationId, int eventId, int timeSlotId)
    {
        try
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateTimeSlot(int organizationId, int eventId, [FromBody] CreateTimeSlotCommand command)
    {
        command.OrganizationId = organizationId;
        command.EventId = eventId;
        await _mediator.Send(command);
        return Ok();
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
        await _mediator.Send(command);
        return Ok();
    }
    
    [HttpDelete]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> DeleteTimeSlot(int organizationId, int eventId, int timeSlotId)
    {
        var command = new DeleteTimeSlotCommand()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId
        };
        await _mediator.Send(command);
        return Ok();
    }
}