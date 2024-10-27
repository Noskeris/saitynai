using MediatR;
using saitynai_backend.Models.Users;

namespace saitynai_backend.Mediator.Commands.Users;

public class RefreshCommand : IRequest<AccessTokenResponse>
{

}