using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Mediator.Queries.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class GetOrganizationIdByOrganizerIdHandler : IRequestHandler<GetOrganizationIdByOrganizerIdQuery, int?>
{
    private readonly Context _context;

    public GetOrganizationIdByOrganizerIdHandler(Context context)
    {
        _context = context;
    }

    public async Task<int?> Handle(GetOrganizationIdByOrganizerIdQuery request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .FirstOrDefaultAsync(o => o.UserId == request.OrganizerId,
                cancellationToken);
        
        return organization?.Id;
    }
}