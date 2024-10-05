using AutoMapper;
using MediatR;
using saitynai_backend.Entities;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.Organizations;
using saitynai_backend.Models.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class CreateOrganizationHandler : IRequestHandler<CreateOrganizationCommand, OrganizationResponse>
{
    private readonly Context _context;
    private readonly IMapper _mapper;

    public CreateOrganizationHandler(Context context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<OrganizationResponse> Handle(CreateOrganizationCommand request, CancellationToken cancellationToken)
    {
        if (_context.Organizations.Any(o => o.Name.ToLower() == request.Name.ToLower()))
        {
            throw new ConflictException("Organization with this name already exists");
        }
        
        var organization = _mapper.Map<Organization>(request);
        
        _context.Organizations.Add(organization);
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return _mapper.Map<OrganizationResponse>(organization);
    }
}