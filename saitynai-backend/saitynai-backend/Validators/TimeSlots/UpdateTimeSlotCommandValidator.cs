using FluentValidation;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Validators.TimeSlots;

public class UpdateTimeSlotCommandValidator : AbstractValidator<UpdateTimeSlotCommand>
{
    public UpdateTimeSlotCommandValidator()
    {
        RuleFor(x => x.StartTime)
            .NotEmpty().WithMessage("StartTime is required.")
            .LessThan(x => x.EndTime).WithMessage("StartTime must be less than EndTime.")
            .GreaterThan(x => DateTime.Now).WithMessage("StartTime must be in the future.");

        RuleFor(x => x.EndTime)
            .NotEmpty().WithMessage("EndTime is required.");
        
        RuleFor(x => x.IsCancelled)
            .Must(x => x == false || x == true).WithMessage("IsCancelled is required.");
    }
}