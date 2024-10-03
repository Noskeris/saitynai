using MediatR;
using saitynai_backend.Mediator.Commands.Organizations;

namespace saitynai_backend.Mediator.Handlers.Organizations;

public class DeleteOrganizationHandler : IRequestHandler<DeleteOrganizationCommand>
{
    public Task Handle(DeleteOrganizationCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}