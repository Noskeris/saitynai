using MediatR;
using saitynai_backend.Models.Users;

namespace saitynai_backend.Mediator.Commands.Users;

public class LoginCommand : IRequest<AccessTokenResponse>
{
    public string UserName { get; set; }
    public string Password { get; set; }
}