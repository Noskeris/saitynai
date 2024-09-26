using Microsoft.AspNetCore.Mvc;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations")]
public class OrganizationController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetOrganizations()
    {
        throw new NotImplementedException();
    }
    
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetOrganization(int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateOrganization()
    {
        throw new NotImplementedException();
    }
    
    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdateOrganization(int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteOrganization(int id)
    {
        throw new NotImplementedException();
    }
}