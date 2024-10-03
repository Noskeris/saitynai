using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Profiles;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventResponse>();
        CreateMap<List<Event>, EventsResponse>()
            .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src));
    }
}