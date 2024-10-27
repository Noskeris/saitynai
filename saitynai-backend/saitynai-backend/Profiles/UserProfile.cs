using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Mediator.Commands.Users;

namespace saitynai_backend.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<RegisterCommand, User>();
    }
}