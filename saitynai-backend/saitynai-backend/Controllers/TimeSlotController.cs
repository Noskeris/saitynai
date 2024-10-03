using MediatR;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Mediator.Commands.TimeSlots;
using saitynai_backend.Mediator.Queries.TimeSlots;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events/{eventId}/time-slots")]
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
    public async Task<IActionResult> CreateTimeSlot(int organizationId, int eventId, CreateTimeSlotCommand command)
    {
        try
        {
            command.OrganizationId = organizationId;
            command.EventId = eventId;
            await _mediator.Send(command);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> UpdateTimeSlot(
        int organizationId,
        int eventId,
        int timeSlotId,
        UpdateTimeSlotCommand command)
    {
        try
        {
            command.OrganizationId = organizationId;
            command.EventId = eventId;
            command.TimeSlotId = timeSlotId;
            await _mediator.Send(command);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpDelete]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> DeleteTimeSlot(int organizationId, int eventId, int timeSlotId)
    {
        try
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
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}