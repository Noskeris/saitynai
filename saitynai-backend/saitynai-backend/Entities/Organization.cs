using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace saitynai_backend.Entities;

public class Organization
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ContactInfo { get; set; }
    public string Address { get; set; }
    public string Website { get; set; }
    public string Logo { get; set; }
    public bool IsNonProfit { get; set; }
    public List<Event> Events { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime LastModifiedAt { get; set; }
}