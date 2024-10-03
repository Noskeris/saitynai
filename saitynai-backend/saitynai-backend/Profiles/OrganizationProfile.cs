using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Profiles;

public class OrganizationProfile : Profile
{
    public OrganizationProfile()
    {
        CreateMap<Organization, OrganizationResponse>();
        
        CreateMap<List<Organization>, OrganizationsResponse>()
            .ForMember(dest => dest.Organizations, opt => opt.MapFrom(src => src));
    }
}