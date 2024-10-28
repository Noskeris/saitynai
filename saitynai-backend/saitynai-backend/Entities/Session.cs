using System.ComponentModel.DataAnnotations;

namespace saitynai_backend.Entities;

public class Session
{
    public Guid Id { get; set; }
    public string LastRefreshToken { get; set; }
    public DateTimeOffset InitiatedAt { get; set; }
    public DateTimeOffset ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
    
    [Required]
    public string UserId { get; set; } = "";
    public User User { get; set; }
}