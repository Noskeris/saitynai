using MediatR;
using saitynai_backend.Mediator.Queries.TimeSlots;
using saitynai_backend.Models.TimeSlots;

namespace saitynai_backend.Mediator.Handlers.TimeSlots;

public class GetTimeSlotsHandler : IRequestHandler<GetTimeSlotsQuery, TimeSlotsResponse>
{
    public Task<TimeSlotsResponse> Handle(GetTimeSlotsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}