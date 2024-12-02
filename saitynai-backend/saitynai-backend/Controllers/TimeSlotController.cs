using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Auth;
using saitynai_backend.Mediator.Commands.TimeSlots;
using saitynai_backend.Mediator.Queries.TimeSlots;
using saitynai_backend.Models.TimeSlots;
using saitynai_backend.Validators;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events/{eventId}/time-slots")]
[Authorize(Roles = Role.Organizer)]
[ValidationFilter]
public class TimeSlotController : ControllerBase
{
    private readonly IMediator _mediator;

    public TimeSlotController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetTimeSlots(
        int organizationId,
        int eventId)
    {
        if (!User.HasRole(Role.User))
        {
            var result = await GetDefaultTimeSlotsResponse(organizationId, eventId);
            return Ok(result);
        }
        else
        {
            var request = new GetTimeSlotsUserQuery()
            {
                OrganizationId = organizationId,
                EventId = eventId,
                UserId = User.GetUserId()
            };
            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }

    private async Task<TimeSlotsResponse> GetDefaultTimeSlotsResponse(int organizationId, int eventId)
    {
        string? organizerId = null;

        if (User.HasRole(Role.Organizer))
        {
            organizerId = User.GetUserId();
        }
        
        var request = new GetTimeSlotsQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            OrganizerId = organizerId
        };

        var result = await _mediator.Send(request);
        return result;
    }

    [HttpGet]
    [Route("{timeSlotId}")]
    public async Task<IActionResult> GetTimeSlot(
        int organizationId,
        int eventId,
        int timeSlotId)
    {
        string? organizerId = null;

        if (User.HasRole(Role.Organizer))
        {
            organizerId = User.GetUserId();
        }
        
        var request = new GetTimeSlotQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId,
            OrganizerId = organizerId
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
        command.UserId = User.GetUserId();
        
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
        command.UserId = User.GetUserId();
        
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
            TimeSlotId = timeSlotId,
            UserId = User.GetUserId()
        };
        await _mediator.Send(command);
        return NoContent();
    }
}