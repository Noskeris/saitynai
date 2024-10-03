using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Profiles;

public class TimeSlotProfile : Profile
{
    public TimeSlotProfile()
    {
        CreateMap<TimeSlot, TimeSlotResponse>();
        CreateMap<List<TimeSlot>, TimeSlotsResponse>()
            .ForMember(dest => dest.TimeSlots, opt => opt.MapFrom(src => src));
    }
}