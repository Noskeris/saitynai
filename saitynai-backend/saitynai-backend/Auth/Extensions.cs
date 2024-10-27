using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.JsonWebTokens;
using saitynai_backend.Exceptions;

namespace saitynai_backend.Auth;

public static class Extensions
{
    public static string ToSHA256(this string input)
    {
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(input);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }
    
    public static string GetUserId(this ClaimsPrincipal user)
    {
        var claim = user.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Sub);

        if (claim is null)
        {
            throw new AccessException("User id not found");
        }
        
        return claim.Value;
    }
    
    public static bool HasRole(this ClaimsPrincipal user, string role)
    {
        var claim = user.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);

        if (claim is null)
        {
            return false;
        }

        return claim.Value == role;
    }
}