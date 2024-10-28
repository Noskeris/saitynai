using System.Text.Json.Serialization;
using MediatR;

namespace saitynai_backend.Mediator.Commands.Organizations;

public class DeleteOrganizationCommand : IRequest
{
    [JsonIgnore]
    public string UserId { get; set; } = "";
    public int OrganizationId { get; set; }
}