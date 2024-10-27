using MediatR;

namespace saitynai_backend.Mediator.Queries.Organizations;

public class GetOrganizationIdByOrganizerIdQuery : IRequest<int?>
{
    public string OrganizerId { get; set; }
}