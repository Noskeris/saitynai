using MediatR;
using Role = saitynai_backend.Enums.Role;

namespace saitynai_backend.Mediator.Commands.Users;

public class RegisterCommand : IRequest
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
}