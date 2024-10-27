using MediatR;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Queries.Organizations;

public class GetOrganizationQuery : IRequest<OrganizationResponse>
{
    public int OrganizationId { get; set; }
    public string? OrganizerId { get; set; }
}