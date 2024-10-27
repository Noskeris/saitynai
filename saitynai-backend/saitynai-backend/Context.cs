using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Entities;

namespace saitynai_backend;

public class Context : IdentityDbContext<User>
{
    private readonly IConfiguration _configuration;
    public virtual DbSet<Event> Events { get; set; }
    public virtual DbSet<TimeSlot> TimeSlots { get; set; }
    public virtual DbSet<Organization> Organizations { get; set; }
    public virtual DbSet<Session> Sessions { get; set; }
    
    public Context(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();
        var connectionString = configuration["SqlServer:ConnectionString"];
        optionsBuilder.UseSqlServer(connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TimeSlot>()
            .HasMany(t => t.Participants)
            .WithMany()
            .UsingEntity<Dictionary<string, object>>(
                "TimeSlotUser",
                j => j
                    .HasOne<User>()
                    .WithMany()
                    .HasForeignKey("ParticipantsId")
                    .OnDelete(DeleteBehavior.Restrict),
                j => j
                    .HasOne<TimeSlot>()
                    .WithMany()
                    .HasForeignKey("TimeSlotId")
                    .OnDelete(DeleteBehavior.Restrict)
            );

        base.OnModelCreating(modelBuilder);
    }
}