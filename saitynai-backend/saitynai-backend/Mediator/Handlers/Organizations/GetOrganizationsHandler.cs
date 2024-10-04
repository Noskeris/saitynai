using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class GetOrganizationsHandler : IRequestHandler<GetOrganizationsQuery, OrganizationsResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public GetOrganizationsHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<OrganizationsResponse> Handle(GetOrganizationsQuery request, CancellationToken cancellationToken)
    {
        var organizations = await _context.Organizations
            .ToListAsync(cancellationToken);

        return _mapper.Map<OrganizationsResponse>(organizations);
    }
}