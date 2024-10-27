using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Identity;
using saitynai_backend.Auth;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Users;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Models.Users;

namespace saitynai_backend.Mediator.Handlers.Users;

public class RefreshHandler : IRequestHandler<RefreshCommand, AccessTokenResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly JwtTokenService _jwtTokenService;
    private readonly HttpContext _httpContext;
    private readonly SessionService _sessionService;
    private readonly IMediator _mediator;

    public RefreshHandler(
        UserManager<User> userManager,
        JwtTokenService jwtTokenService,
        IHttpContextAccessor httpContextAccessor,
        SessionService sessionService,
        IMediator mediator)
    {
        _userManager = userManager;
        _jwtTokenService = jwtTokenService;
        _httpContext = httpContextAccessor.HttpContext ?? throw new InvalidOperationException();
        _sessionService = sessionService;
        _mediator = mediator;
    }

    public async Task<AccessTokenResponse> Handle(RefreshCommand request, CancellationToken cancellationToken)
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

        var sessionIdAsGuid = Guid.Parse(sessionId);
        if (!await _sessionService.IsSessionValidAsync(sessionIdAsGuid, refreshToken))
        {
            throw new AccessException("Session is not valid");
        }
        
        var userId = claims.FindFirstValue(JwtRegisteredClaimNames.Sub);
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new AccessException("User not found");
        }
        
        var roles = await _userManager.GetRolesAsync(user);
        var expiresAt = DateTime.UtcNow.AddDays(1);
        var organizationId = await _mediator.Send(
            new GetOrganizationIdByOrganizerIdQuery()
            {
                OrganizerId = user.Id
            },
            cancellationToken);

        var accessToken = _jwtTokenService
            .CreateAccessToken(user.UserName ?? throw new InvalidOperationException(), user.Id, roles, organizationId);


        var newRefreshToken = _jwtTokenService.CreateRefreshToken(sessionIdAsGuid, user.Id, expiresAt);
        
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Expires = expiresAt
        };
        
        _httpContext.Response.Cookies.Append("RefreshToken", newRefreshToken, cookieOptions);
        
        await _sessionService.ExtendSessionAsync(sessionIdAsGuid, newRefreshToken, expiresAt);
        
        return new AccessTokenResponse(accessToken);
    }
}