using MediatR;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class GetOrganizationHandler : IRequestHandler<GetOrganizationQuery, OrganizationResponse>
{
    public Task<OrganizationResponse> Handle(GetOrganizationQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}