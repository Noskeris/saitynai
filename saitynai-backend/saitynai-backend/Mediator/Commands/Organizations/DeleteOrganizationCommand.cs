using MediatR;

namespace saitynai_backend.Mediator.Commands.Organizations;

public class DeleteOrganizationCommand : IRequest
{
    public int OrganizationId { get; set; }
}