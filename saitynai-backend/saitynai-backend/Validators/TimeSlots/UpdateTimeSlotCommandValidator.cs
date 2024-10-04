using FluentValidation;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Validators.TimeSlots;

public class UpdateTimeSlotCommandValidator : AbstractValidator<UpdateTimeSlotCommand>
{
    public UpdateTimeSlotCommandValidator()
    {
        RuleFor(x => x.StartTime)
            .NotEmpty().WithMessage("StartTime is required.")
            .LessThan(x => x.EndTime).WithMessage("StartTime must be less than EndTime.");

        RuleFor(x => x.EndTime)
            .NotEmpty().WithMessage("EndTime is required.");
        
        RuleFor(x => x.IsAvailable)
            .NotEmpty().WithMessage("IsAvailable is required.");
    }
}