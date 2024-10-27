using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Auth;
using saitynai_backend.Mediator.Commands.Events;
using saitynai_backend.Mediator.Queries.Events;
using saitynai_backend.Validators;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events")]
[Authorize(Roles = Role.Organizer)]
[ValidationFilter]
public class EventController : ControllerBase
{
    private readonly IMediator _mediator;

    public EventController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetEvents(int organizationId)
    {
        string? organizerId = null;

        if (User.HasRole(Role.Organizer))
        {
            organizerId = User.GetUserId();
        }
        
        var request = new GetEventsQuery()
        {
            OrganizationId = organizationId,
            OrganizerId = organizerId
        };

        var events = await _mediator.Send(request);
        return Ok(events);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("{eventId}")]
    public async Task<IActionResult> GetEvent(
        int organizationId,
        int eventId)
    {
        string? organizerId = null;

        if (User.HasRole(Role.Organizer))
        {
            organizerId = User.GetUserId();
        }
        
        var request = new GetEventQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            OrganizerId = organizerId
        };

        var events = await _mediator.Send(request);
        return Ok(events);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent(
        int organizationId,
        [FromBody] CreateEventCommand command)
    {
        command.UserId = User.GetUserId();
        command.OrganizationId = organizationId;

        var @event = await _mediator.Send(command);
        return Created($"api/v1/organizations/{organizationId}/events/{@event.Id}", @event);
    }

    [HttpPut]
    [Route("{eventId}")]
    public async Task<IActionResult> UpdateEvent(
        int organizationId,
        int eventId,
        [FromBody] UpdateEventCommand command)
    {
        command.UserId = User.GetUserId();
        command.OrganizationId = organizationId;
        command.EventId = eventId;

        var @event = await _mediator.Send(command);

        return Ok(@event);
    }

    [HttpDelete]
    [Route("{eventId}")]
    public async Task<IActionResult> DeleteEvent(
        int organizationId,
        int eventId)
    {
        var command = new DeleteEventCommand()
        {
            UserId = User.GetUserId(),
            OrganizationId = organizationId,
            EventId = eventId
        };

        await _mediator.Send(command);
        return NoContent();
    }
}