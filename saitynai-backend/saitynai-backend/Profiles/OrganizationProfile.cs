using AutoMapper;
using saitynai_backend.Entities;
using saitynai_backend.Mediator.Commands.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Profiles;

public class OrganizationProfile : Profile
{
    public OrganizationProfile()
    {
        CreateMap<Organization, OrganizationResponse>();
        
        CreateMap<List<Organization>, OrganizationsResponse>()
            .ForMember(dest => dest.Organizations, opt => opt.MapFrom(src => src));
        
        CreateMap<UpdateOrganizationCommand, Organization>()
            .ForMember(dest => dest.LastModifiedAt, opt => opt.MapFrom(src => DateTime.Now));
        CreateMap<CreateOrganizationCommand, Organization>()
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.Now));
    }
}