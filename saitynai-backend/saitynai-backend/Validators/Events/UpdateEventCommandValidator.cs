using FluentValidation;
using saitynai_backend.Mediator.Commands.Events;

namespace saitynai_backend.Validators.Events;

public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
{
    public UpdateEventCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Location is required.");

        RuleFor(x => x.Requirements)
            .MaximumLength(500).WithMessage("Requirements must not exceed 500 characters.");
    }
}