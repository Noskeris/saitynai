using FluentValidation;
using saitynai_backend.Mediator.Commands.TimeSlots;

namespace saitynai_backend.Validators.TimeSlots;

public class CreateTimeSlotCommandValidator : AbstractValidator<CreateTimeSlotCommand>
{
    public CreateTimeSlotCommandValidator()
    {
        RuleFor(x => x.StartTime)
            .NotEmpty().WithMessage("StartTime is required.")
            .LessThan(x => x.EndTime).WithMessage("StartTime must be less than EndTime.")
            .GreaterThan(x => DateTime.Now).WithMessage("StartTime must be in the future.");

        RuleFor(x => x.EndTime)
            .NotEmpty().WithMessage("EndTime is required.");
    }
}