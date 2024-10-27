using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Auth;
using saitynai_backend.Mediator.Commands.Participants;
using saitynai_backend.Mediator.Queries.Participants;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events/{eventId}/time-slots/{timeSlotId}/participants")]
[Authorize]
public class ParticipantsController : ControllerBase
{
    private readonly IMediator _mediator;

    public ParticipantsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [Authorize(Roles = Role.Organizer)]
    public async Task<IActionResult> GetParticipants(int organizationId, int eventId, int timeSlotId)
    {
        var response = await _mediator.Send(new GetParticipantsQuery()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId,
            OrganizerId = User.GetUserId()
        });
        return Ok(response);
    }
    
    [HttpPost]
    [Authorize(Roles = Role.User)]
    public async Task<IActionResult> AddParticipant(int organizationId, int eventId, int timeSlotId)
    {
        await _mediator.Send(new AddParticipantCommand()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId,
            UserId = User.GetUserId()
        });
        
        return Created($"api/v1/organizations/{organizationId}/events/{eventId}/time-slots/{timeSlotId}", true);

    }
    
    [HttpDelete]
    [Route("{participantId}")]
    public async Task<IActionResult> RemoveParticipant(int organizationId, int eventId, int timeSlotId, string participantId)
    {
        string? organizerId = null;

        if (User.HasRole(Role.Organizer))
        {
            organizerId = User.GetUserId();
        }

        if (User.HasRole(Role.User) && User.GetUserId() != participantId)
        {
            return Forbid();
        }
        
        await _mediator.Send(new RemoveParticipantCommand()
        {
            OrganizationId = organizationId,
            EventId = eventId,
            TimeSlotId = timeSlotId,
            UserId = participantId,
            OrganizerId = organizerId
        });
        
        return Ok();
    }
}