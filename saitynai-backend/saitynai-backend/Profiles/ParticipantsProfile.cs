using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Models.Participants;

namespace saitynai_backend.Profiles;

public class ParticipantsProfile : Profile
{
    public ParticipantsProfile()
    {
        CreateMap<User, ParticipantResponse>();
        CreateMap<List<User>, ParticipantsResponse>()
            .ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src));
    }
}