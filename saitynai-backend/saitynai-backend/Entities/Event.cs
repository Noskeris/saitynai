using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace saitynai_backend.Entities;

public class Event
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int OrganizationId { get; set; }
    public Organization Organization { get; set; }
    public List<TimeSlot> TimeSlots { get; set; }
    public DateTime CreatedAt { get; set; }
}