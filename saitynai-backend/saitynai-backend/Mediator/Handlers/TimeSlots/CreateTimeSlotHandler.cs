using MediatR;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class CreateTimeSlotHandler : IRequestHandler<CreateTimeSlotCommand>
{
    public Task Handle(CreateTimeSlotCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}