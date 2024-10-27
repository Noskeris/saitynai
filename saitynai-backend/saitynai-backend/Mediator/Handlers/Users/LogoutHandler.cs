using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using saitynai_backend.Auth;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Users;

namespace saitynai_backend.Mediator.Handlers.Users;

public class LogoutHandler : IRequestHandler<LogoutCommand>
{
    private readonly JwtTokenService _jwtTokenService;
    private readonly HttpContext _httpContext;
    private readonly SessionService _sessionService;

    public LogoutHandler(
        JwtTokenService jwtTokenService,
        IHttpContextAccessor httpContextAccessor,
        SessionService sessionService)
    {
        _jwtTokenService = jwtTokenService;
        _httpContext = httpContextAccessor.HttpContext ?? throw new InvalidOperationException();
        _sessionService = sessionService;
    }

    public async Task Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        if(!_httpContext.Request.Cookies.TryGetValue("RefreshToken", out var refreshToken))
        {
            throw new AccessException("No refresh token found");
        }

        if (!_jwtTokenService.TryParseRefreshToken(refreshToken, out var claims))
        {
            throw new AccessException("Invalid refresh token");
        }
        
        var sessionId = claims.FindFirstValue("SessionId");
        if (string.IsNullOrWhiteSpace(sessionId))
        {
            throw new AccessException("SessionId not found");
        }

        await _sessionService.InvalidateSessionAsync(Guid.Parse(sessionId));
        _httpContext.Response.Cookies.Delete("RefreshToken");
    }
}