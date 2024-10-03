using MediatR;
using saitynai_backend.Mediator.Commands.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class CreateEventHandler : IRequestHandler<CreateEventCommand>
{
    public Task Handle(CreateEventCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}