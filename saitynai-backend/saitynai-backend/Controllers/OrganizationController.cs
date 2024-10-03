using MediatR;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Mediator.Commands.Organizations;
using saitynai_backend.Mediator.Queries.Organizations;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations")]
public class OrganizationController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrganizationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetOrganizations()
    {
        try
        {
            var request = new GetOrganizationsQuery();
            var result = await _mediator.Send(request);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    [Route("{organizationId}")]
    public async Task<IActionResult> GetOrganization(int organizationId)
    {
        try
        {
            var request = new GetOrganizationQuery()
            {
                OrganizationId = organizationId
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
    public async Task<IActionResult> CreateOrganization(CreateOrganizationCommand command)
    {
        try
        {
            await _mediator.Send(command);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut]
    [Route("{organizationId}")]
    public async Task<IActionResult> UpdateOrganization(int organizationId, UpdateOrganizationCommand command)
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
    
    [HttpDelete]
    [Route("{organizationId}")]
    public async Task<IActionResult> DeleteOrganization(int organizationId)
    {
        try
        {
            var command = new DeleteOrganizationCommand()
            {
                OrganizationId = organizationId
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