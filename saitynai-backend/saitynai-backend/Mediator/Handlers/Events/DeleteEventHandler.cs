using MediatR;
using saitynai_backend.Mediator.Commands.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class DeleteEventHandler : IRequestHandler<DeleteEventCommand>
{
    public Task Handle(DeleteEventCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}