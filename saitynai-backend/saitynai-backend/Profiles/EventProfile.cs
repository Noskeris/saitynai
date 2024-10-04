using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Mediator.Commands.Events;
using saitynai_backend.Models.Events;

namespace saitynai_backend.Profiles;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventResponse>();
        CreateMap<List<Event>, EventsResponse>()
            .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src));
        CreateMap<UpdateEventCommand, Event>()
            .ForMember(dest => dest.LastModifiedAt, opt => opt.MapFrom(src => DateTime.Now));
        CreateMap<CreateEventCommand, Event>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now));
    }
}