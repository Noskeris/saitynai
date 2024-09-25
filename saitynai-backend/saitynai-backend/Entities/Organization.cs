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
    public List<Event> Events { get; set; }
    public DateTime CreatedAt { get; set; }
}