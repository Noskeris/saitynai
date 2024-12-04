namespace saitynai_backend.Models.TimeSlots;

public class TimeSlotResponse
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int? MaxParticipants { get; set; }
    public int ParticipantsCount { get; set; }
    public bool IsCancelled { get; set; }
}