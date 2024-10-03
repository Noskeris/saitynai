using MediatR;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Mediator.Commands.Events;
using saitynai_backend.Mediator.Queries.Events;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events")]
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
        try
        {
            var request = new GetEventsQuery()
            {
                OrganizationId = organizationId
            };
            
            var events = await _mediator.Send(request);
            return Ok(events);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet]
    [Route("{eventId}")]
    public async Task<IActionResult> GetEvent(int organizationId, int eventId)
    {
        try
        {
            var request = new GetEventQuery()
            {
                OrganizationId = organizationId,
                EventId = eventId
            };
            
            var events = await _mediator.Send(request);
            return Ok(events);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateEvent(int organizationId, CreateEventCommand command)
    {
        try
        {
            command.OrganizationId = organizationId;
            await _mediator.Send(command);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut]
    [Route("{eventId}")]
    public async Task<IActionResult> UpdateEvent(int organizationId, int eventId, UpdateEventCommand command)
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
    
    [HttpDelete]
    [Route("{eventId}")]
    public async Task<IActionResult> DeleteEvent(int organizationId, int id)
    {
        try
        {
            var command = new DeleteEventCommand()
            {
                OrganizationId = organizationId,
                EventId = id
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