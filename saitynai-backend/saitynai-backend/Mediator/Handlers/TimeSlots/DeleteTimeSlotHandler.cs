using MediatR;
using Microsoft.EntityFrameworkCore;
using saitynai_backend.Exceptions;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class DeleteTimeSlotHandler : IRequestHandler<DeleteTimeSlotCommand>
{
    private readonly Context _context;

    public DeleteTimeSlotHandler(Context context)
    {
        _context = context;
    }

    public async Task Handle(DeleteTimeSlotCommand request, CancellationToken cancellationToken)
    {
        var timeSlot = await _context.TimeSlots
            .FirstOrDefaultAsync(ts => ts.Id == request.TimeSlotId, cancellationToken);

        if (timeSlot == null)
        {
            throw new NotFoundException("Time slot not found");
        }

        _context.TimeSlots.Remove(timeSlot);

        await _context.SaveChangesAsync(cancellationToken);
    }
}