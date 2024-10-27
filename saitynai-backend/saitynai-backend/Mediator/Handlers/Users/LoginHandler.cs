using MediatR;
using Microsoft.AspNetCore.Identity;
using saitynai_backend.Auth;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Users;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Models.Users;

namespace saitynai_backend.Mediator.Handlers.Users;

public class LoginHandler : IRequestHandler<LoginCommand, AccessTokenResponse>
{
    private readonly UserManager<User> _userManager;
    private readonly JwtTokenService _jwtTokenService;
    private readonly HttpContext _httpContext;
    private readonly SessionService _sessionService;
    private readonly IMediator _mediator;

    public LoginHandler(
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

    public async Task<AccessTokenResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserName);

        if (user == null)
        {
            throw new NotFoundException("Incorrect username or password");
        }

        if (!await _userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new NotFoundException("Incorrect username or password");
        }

        var roles = await _userManager.GetRolesAsync(user);

        var sessionId = Guid.NewGuid();
        var expiresAt = DateTime.UtcNow.AddDays(1);

        var organizationId = await _mediator.Send(
            new GetOrganizationIdByOrganizerIdQuery()
            {
                OrganizerId = user.Id
            },
            cancellationToken);

        var accessToken = _jwtTokenService
            .CreateAccessToken(user.UserName ?? throw new InvalidOperationException(), user.Id, roles, organizationId);

        var refreshToken = _jwtTokenService.CreateRefreshToken(sessionId, user.Id, expiresAt);

        await _sessionService.CreateSessionAsync(sessionId, user.Id, refreshToken, expiresAt);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Lax,
            Expires = expiresAt
        };

        _httpContext.Response.Cookies.Append("RefreshToken", refreshToken, cookieOptions);

        return new AccessTokenResponse(accessToken);
    }
}