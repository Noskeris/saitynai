using Microsoft.AspNetCore.Mvc;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events")]
public class EventController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetEvents(int organizationId)
    {
        throw new NotImplementedException();
    }
    
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetEvent(int organizationId, int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateEvent(int organizationId)
    {
        throw new NotImplementedException();
    }
    
    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdateEvent(int organizationId, int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteEvent(int organizationId, int id)
    {
        throw new NotImplementedException();
    }
}