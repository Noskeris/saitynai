using MediatR;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class UpdateTimeSlotHandler : IRequestHandler<UpdateTimeSlotCommand>
{
    public Task Handle(UpdateTimeSlotCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}