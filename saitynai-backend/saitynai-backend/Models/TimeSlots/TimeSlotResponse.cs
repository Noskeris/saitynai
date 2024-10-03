namespace saitynai_backend.Models.TimeSlots;

public class TimeSlotResponse
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAvailable { get; set; }
    public bool IsCancelled { get; set; }
}