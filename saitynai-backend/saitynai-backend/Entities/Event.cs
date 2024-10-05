namespace saitynai_backend.Entities;

public class Event : Entity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int OrganizationId { get; set; }
    public string Location { get; set; }
    public string Requirements { get; set; }
    public Organization Organization { get; set; }
    public List<TimeSlot> TimeSlots { get; set; } = new();
}