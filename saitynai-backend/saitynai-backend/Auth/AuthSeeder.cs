using Microsoft.AspNetCore.Identity;
using saitynai_backend.Entities;

namespace saitynai_backend.Auth;

public class AuthSeeder
{
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    
    public AuthSeeder(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }
    
    public async Task SeedAsync()
    {
        await SeedRolesAsync();
    }
    
    private async Task SeedRolesAsync()
    {
        var roles = new List<IdentityRole>
        {
            new IdentityRole { Name = "Organizer" },
            new IdentityRole { Name = "User" }
        };
        
        foreach (var role in roles)
        {
            var existingRole = await _roleManager.FindByNameAsync(role.Name);
            
            if (existingRole == null)
            {
                await _roleManager.CreateAsync(role);
            }
        }
    }
}