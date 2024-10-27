using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Users;

namespace saitynai_backend.Mediator.Handlers.Users;

public class RegisterHandler : IRequestHandler<RegisterCommand>
{
    private readonly UserManager<User> _userManager;
    private readonly IMapper _mapper;

    public RegisterHandler(UserManager<User> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    public async Task Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.UserName);
        
        if (user != null)
        {
            throw new ConflictException($"Username {request.UserName} already taken");
        }
        
        user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user != null)
        {
            throw new ConflictException($"Email {request.Email} already taken");
        }
        
        var newUser = _mapper.Map<User>(request);
        
        var result = await _userManager.CreateAsync(newUser, request.Password);
        
        if (!result.Succeeded)
        {
            throw new ConflictException("Failed to create user");
        }
        
        await _userManager.AddToRoleAsync(newUser, request.Role.ToString().ToUpper());
    }
}