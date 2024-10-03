using MediatR;
using saitynai_backend.Mediator.Commands.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class UpdateOrganizationHandler : IRequestHandler<UpdateOrganizationCommand>
{
    public Task Handle(UpdateOrganizationCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}