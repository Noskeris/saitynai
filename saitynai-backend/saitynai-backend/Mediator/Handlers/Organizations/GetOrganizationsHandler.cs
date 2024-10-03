using MediatR;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class GetOrganizationsHandler : IRequestHandler<GetOrganizationsQuery, OrganizationsResponse>
{
    public Task<OrganizationsResponse> Handle(GetOrganizationsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}