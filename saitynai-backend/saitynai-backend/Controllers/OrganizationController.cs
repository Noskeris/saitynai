using MediatR;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Mediator.Commands.Organizations;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Validators;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations")]
[ValidationFilter]
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
        var request = new GetOrganizationsQuery();
        
        var result = await _mediator.Send(request);
        return Ok(result);
    }

    [HttpGet]
    [Route("{organizationId}")]
    public async Task<IActionResult> GetOrganization(int organizationId)
    {
        var request = new GetOrganizationQuery()
        {
            OrganizationId = organizationId
        };
        
        var result = await _mediator.Send(request);
        return Ok(result);
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateOrganization([FromBody] CreateOrganizationCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }
    
    [HttpPut]
    [Route("{organizationId}")]
    public async Task<IActionResult> UpdateOrganization(int organizationId, [FromBody] UpdateOrganizationCommand command)
    {
        command.OrganizationId = organizationId;
        
        await _mediator.Send(command);
        return Ok();
    }
    
    [HttpDelete]
    [Route("{organizationId}")]
    public async Task<IActionResult> DeleteOrganization(int organizationId)
    {
        var command = new DeleteOrganizationCommand()
        {
            OrganizationId = organizationId
        };
        
        await _mediator.Send(command);
        return Ok();
    }
}