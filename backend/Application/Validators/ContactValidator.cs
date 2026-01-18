using Application.Common.Validation;
using Domain.Entities;
using FluentValidation;

namespace Application.Validators;

public class ContactValidator : AbstractValidator<Contact>
{
    public ContactValidator()
    {
        RuleFor(c => c.FirstName).NotEmpty().Length(3, 100);
        RuleFor(c => c.LastName).NotEmpty().Length(3, 100);
        RuleFor(c => c.Cpf).NotEmpty().MustBeValidCpf();
        RuleFor(c => c.DateOfBirth).NotEmpty().Must(BeAtLeastTenYearsOld).WithMessage("Contact must be at least 10 years old.");
    }

    private bool BeAtLeastTenYearsOld(DateTime dateOfBirth)
    {
        return dateOfBirth <= DateTime.Now.AddYears(-10);
    }
}
