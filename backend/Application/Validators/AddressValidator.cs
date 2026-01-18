using Domain.Entities;
using FluentValidation;

namespace Application.Validators;

public class AddressValidator : AbstractValidator<Address>
{
    public AddressValidator()
    {
        RuleFor(a => a.Zip).NotEmpty().Length(8);
        RuleFor(a => a.Street).NotEmpty().Length(5, 100);
        RuleFor(a => a.Complement).Length(5, 50).When(a => !string.IsNullOrEmpty(a.Complement));
        RuleFor(a => a.Unity).Length(5, 100).When(a => !string.IsNullOrEmpty(a.Unity));
        RuleFor(a => a.Neighborhood).NotEmpty().Length(5, 100);
        RuleFor(a => a.City).NotEmpty().Length(5, 100);
        RuleFor(a => a.Uf).NotEmpty().Length(2);
        RuleFor(a => a.State).NotEmpty().Length(5, 50);
        RuleFor(a => a.Region).Length(5, 50).When(a => !string.IsNullOrEmpty(a.Region));
        RuleFor(a => a.Ibge).Length(7).When(a => !string.IsNullOrEmpty(a.Ibge));
        RuleFor(a => a.Gia).Length(5, 50).When(a => !string.IsNullOrEmpty(a.Gia));
        RuleFor(a => a.Ddd).Length(8).When(a => !string.IsNullOrEmpty(a.Ddd));
        RuleFor(a => a.Siafi).Length(5, 6).When(a => !string.IsNullOrEmpty(a.Siafi));
    }
}
