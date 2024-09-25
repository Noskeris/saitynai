using Microsoft.EntityFrameworkCore;
using saitynai_backend.Entities;

namespace saitynai_backend;

public class Context : DbContext
{
    private readonly IConfiguration _configuration;
    public virtual DbSet<Event> Events { get; set; }
    public virtual DbSet<TimeSlot> TimeSlots { get; set; }
    public virtual DbSet<Organization> Organizations { get; set; }
    
    public Context(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString(("PostgreSQL")));
    }
}