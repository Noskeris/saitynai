using MediatR;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Mediator.Commands.Events;
using saitynai_backend.Mediator.Queries.Events;
using saitynai_backend.Validators;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events")]
[ValidationFilter]
public class EventController : ControllerBase
{
    private readonly IMediator _mediator;

    public EventController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents(int organizationId)
    {
        var request = new GetEventsQuery()
        {
            OrganizationId = organizationId
        };

        var events = await _mediator.Send(request);
        return Ok(events);
    }

    [HttpGet]
    [Route("{eventId}")]
    public async Task<IActionResult> GetEvent(
        int organizationId,
        int eventId)
    {
        var request = new GetEventQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId
        };

        var events = await _mediator.Send(request);
        return Ok(events);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent(
        int organizationId,
        [FromBody] CreateEventCommand command)
    {
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
        command.OrganizationId = organizationId;
        command.EventId = eventId;

        var @event = await _mediator.Send(command);

        return Ok(@event);
    }

    [HttpDelete]
    [Route("{eventId}")]
    public async Task<IActionResult> DeleteEvent(
        int organizationId,
        int id)
    {
        var command = new DeleteEventCommand()
        {
            OrganizationId = organizationId,
            EventId = id
        };

        await _mediator.Send(command);
        return NoContent();
    }
}