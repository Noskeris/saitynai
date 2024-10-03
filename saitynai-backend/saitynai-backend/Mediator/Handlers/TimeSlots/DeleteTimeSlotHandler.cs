using MediatR;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class DeleteTimeSlotHandler : IRequestHandler<DeleteTimeSlotCommand>
{
    public Task Handle(DeleteTimeSlotCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}