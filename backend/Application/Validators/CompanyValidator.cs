using Application.Common.Validation;
using Domain.Entities;
using FluentValidation;

namespace Application.Validators;

public class CompanyValidator : AbstractValidator<Company>
{
    public CompanyValidator()
    {
        RuleFor(c => c.Name).NotEmpty().Length(5, 100);
        RuleFor(c => c.Description).NotEmpty().Length(5, 100);
        RuleFor(c => c.Cnpj).NotEmpty().MustBeValidCnpj();
        RuleFor(c => c.DateFounded).NotEmpty().LessThanOrEqualTo(DateTime.Now).WithMessage("Date founded cannot be in the future.");
    }
}
