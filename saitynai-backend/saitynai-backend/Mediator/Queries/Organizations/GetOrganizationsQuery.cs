using MediatR;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Queries.Organizations;

public class GetOrganizationsQuery : IRequest<OrganizationsResponse>
{

}