using saitynai_backend.Entities;

namespace saitynai_backend.Auth;

public class SessionService
{
    private readonly Context _context;

    public SessionService(Context context)
    {
        _context = context;
    }

    public async Task CreateSessionAsync(Guid sessionId, string userId, string refreshToken, DateTime expiresAt)
    {
        var session = new Session
        {
            Id = sessionId,
            UserId = userId,
            LastRefreshToken = refreshToken.ToSHA256(),
            InitiatedAt = DateTimeOffset.UtcNow,
            ExpiresAt = expiresAt
        };
        
        _context.Sessions.Add(session);
        await _context.SaveChangesAsync();
    }
    
    public async Task ExtendSessionAsync(Guid sessionId, string refreshToken, DateTime expiresAt)
    {
        var session = await _context.Sessions.FindAsync(sessionId);
        if (session == null)
        {
            return;
            
        }

        session.ExpiresAt = expiresAt;
        session.LastRefreshToken = refreshToken.ToSHA256();
        await _context.SaveChangesAsync();
    }
    
    public async Task InvalidateSessionAsync(Guid sessionId)
    {
        var session = await _context.Sessions.FindAsync(sessionId);
        if (session == null)
        {
            return;
        }

        session.IsRevoked = true;
        await _context.SaveChangesAsync();
    }
    
    public async Task<bool> IsSessionValidAsync(Guid sessionId, string refreshToken)
    {
        var session = await _context.Sessions.FindAsync(sessionId);

        return session is not null
               && !session.IsRevoked
               && session.LastRefreshToken == refreshToken.ToSHA256()
               && session.ExpiresAt > DateTimeOffset.UtcNow;
    }
}