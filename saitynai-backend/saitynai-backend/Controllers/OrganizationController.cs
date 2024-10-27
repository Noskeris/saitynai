using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Auth;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Organizations;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Validators;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations")]
[Authorize(Roles = Role.Organizer)]
[ValidationFilter]
public class OrganizationController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrganizationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetOrganizations()
    {
        if (User.HasRole(Role.Organizer))
        {
            throw new ForbiddenException("Organizers are not allowed to view other organizations");
        }
        var request = new GetOrganizationsQuery();
        
        var result = await _mediator.Send(request);
        return Ok(result);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("{organizationId}")]
    public async Task<IActionResult> GetOrganization(int organizationId)
    {
        string? organizerId = null;

        if (User.HasRole(Role.Organizer))
        {
            organizerId = User.GetUserId();
        }
        
        var request = new GetOrganizationQuery()
        {
            OrganizationId = organizationId,
            OrganizerId = organizerId
        };
        
        var result = await _mediator.Send(request);
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateOrganization([FromBody] CreateOrganizationCommand command)
    {
        command.UserId = User.GetUserId();
        var organization = await _mediator.Send(command);
        return Created($"api/v1/organizations/{organization.Id}", organization);
    }
    
    [HttpPut]
    [Route("{organizationId}")]
    public async Task<IActionResult> UpdateOrganization(
        int organizationId,
        [FromBody] UpdateOrganizationCommand command)
    {
        command.UserId = User.GetUserId();
        command.OrganizationId = organizationId;
        
        var organization = await _mediator.Send(command);
        return Ok(organization);
    }
    
    [HttpDelete]
    [Route("{organizationId}")]
    public async Task<IActionResult> DeleteOrganization(int organizationId)
    {
        var command = new DeleteOrganizationCommand()
        {
            OrganizationId = organizationId,
            UserId = User.GetUserId()
        };
        
        await _mediator.Send(command);
        return NoContent();
    }
}