using FluentValidation;
using saitynai_backend.Mediator.Commands.Organizations;

namespace saitynai_backend.Validators.Organizations;

public class CreateOrganizationCommandValidator : AbstractValidator<CreateOrganizationCommand>
{
    public CreateOrganizationCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.");

        RuleFor(x => x.ContactInfo)
            .NotEmpty().WithMessage("ContactInfo is required.")
            .MaximumLength(100).WithMessage("ContactInfo must not exceed 100 characters.");
        
        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Address is required.")
            .MaximumLength(100).WithMessage("Address must not exceed 100 characters.");

        RuleFor(x => x.Website)
            .NotEmpty().WithMessage("Website is required.");
        
        RuleFor(x => x.Logo)
            .NotEmpty().WithMessage("Logo is required.");

        RuleFor(x => x.IsNonProfit)
            .NotEmpty().WithMessage("IsNonProfit is required.");
    }
}