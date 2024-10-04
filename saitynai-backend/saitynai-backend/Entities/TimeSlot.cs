using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace saitynai_backend.Entities;

public class TimeSlot : Entity
{ 
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
    public bool IsAvailable { get; set; }
    public bool IsCancelled { get; set; }
}