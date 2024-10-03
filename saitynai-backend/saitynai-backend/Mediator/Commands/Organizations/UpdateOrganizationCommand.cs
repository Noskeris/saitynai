using MediatR;

namespace saitynai_backend.Mediator.Commands.Organizations;

public class UpdateOrganizationCommand : IRequest
{
    public int OrganizationId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ContactInfo { get; set; }
    public string Address { get; set; }
    public string Website { get; set; }
    public string Logo { get; set; }
}