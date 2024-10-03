using MediatR;
using saitynai_backend.Mediator.Commands.Events;

namespace saitynai_backend.Mediator.Handlers.Events;

public class UpdateEventHandler : IRequestHandler<UpdateEventCommand>
{
    public Task Handle(UpdateEventCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}