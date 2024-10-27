using MediatR;

namespace saitynai_backend.Mediator.Commands.Organizations;

public class DeleteOrganizationCommand : IRequest
{
    public string UserId { get; set; }
    public int OrganizationId { get; set; }
}