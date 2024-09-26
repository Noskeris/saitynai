using Microsoft.AspNetCore.Mvc;

namespace saitynai_backend.Controllers;

[Route("api/v1/organizations/{organizationId}/events/{eventId}/time-slots")]
public class TimeSlotController : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetTimeSlots(int organizationId, int eventId)
    {
        throw new NotImplementedException();
    }
    
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetTimeSlot(int organizationId, int eventId, int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateTimeSlot(int organizationId, int eventId)
    {
        throw new NotImplementedException();
    }
    
    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> UpdateTimeSlot(int organizationId, int eventId, int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteTimeSlot(int organizationId, int eventId, int id)
    {
        throw new NotImplementedException();
    }
}