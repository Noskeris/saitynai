using MediatR;
using saitynai_backend.Mediator.Queries.TimeSlots;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class GetTimeSlotHandler : IRequestHandler<GetTimeSlotQuery, TimeSlotResponse>
{
    public Task<TimeSlotResponse> Handle(GetTimeSlotQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}