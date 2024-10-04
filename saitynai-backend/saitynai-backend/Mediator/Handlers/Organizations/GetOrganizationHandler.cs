using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Queries.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class GetOrganizationHandler : IRequestHandler<GetOrganizationQuery, OrganizationResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public GetOrganizationHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<OrganizationResponse> Handle(GetOrganizationQuery request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .FirstOrDefaultAsync(o => o.Id == request.OrganizationId,
                cancellationToken);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }

        return _mapper.Map<OrganizationResponse>(organization);
    }
}