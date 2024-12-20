using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class UpdateOrganizationHandler : IRequestHandler<UpdateOrganizationCommand, OrganizationResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public UpdateOrganizationHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<OrganizationResponse> Handle(UpdateOrganizationCommand request, CancellationToken cancellationToken)
    {
        var organization = await _context.Organizations
            .FirstOrDefaultAsync(o => o.Id == request.OrganizationId, cancellationToken);

        if (organization == null)
        {
            throw new NotFoundException("Organization not found");
        }
        
        if (organization.UserId != request.UserId)
        {
            throw new ForbiddenException("Cannot update organization that does not belong to you");
        }
        
        if (await _context.Organizations
                .AnyAsync(o => o.Name.ToLower() == request.Name.ToLower() 
                               && o.Id != request.OrganizationId, cancellationToken))
        {
            throw new ConflictException("Organization with this name already exists");
        }

        _mapper.Map(request, organization);

        await _context.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<OrganizationResponse>(organization);
    }
}