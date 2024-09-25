using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace saitynai_backend.Entities;

public class TimeSlot
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
    public DateTime CreatedAt { get; set; }
}