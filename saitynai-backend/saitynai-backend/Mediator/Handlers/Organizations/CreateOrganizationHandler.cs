using MediatR;
using saitynai_backend.Mediator.Commands.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class CreateOrganizationHandler : IRequestHandler<CreateOrganizationCommand>
{
    public Task Handle(CreateOrganizationCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}