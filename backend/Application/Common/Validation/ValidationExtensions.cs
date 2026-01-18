using FluentValidation;

namespace Application.Common.Validation;

public static class ValidationExtensions
{
    public static IRuleBuilderOptions<T, string> MustBeValidCnpj<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder.Must(cnpj =>
        {
            if (string.IsNullOrWhiteSpace(cnpj)) return false;
            var multiplicationTable1 = new[] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            var multiplicationTable2 = new[] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            cnpj = cnpj.Trim().Replace(".", "").Replace("-", "").Replace("/", "");
            if (cnpj.Length != 14 || new string(cnpj[0], 14) == cnpj) return false;
            var tempCnpj = cnpj.Substring(0, 12);
            var sum = 0;
            for (var i = 0; i < 12; i++)
                sum += int.Parse(tempCnpj[i].ToString()) * multiplicationTable1[i];
            var remainder = (sum % 11);
            if (remainder < 2)
                remainder = 0;
            else
                remainder = 11 - remainder;
            var digit = remainder.ToString();
            tempCnpj += digit;
            sum = 0;
            for (var i = 0; i < 13; i++)
                sum += int.Parse(tempCnpj[i].ToString()) * multiplicationTable2[i];
            remainder = (sum % 11);
            if (remainder < 2)
                remainder = 0;
            else
                remainder = 11 - remainder;
            digit += remainder.ToString();
            return cnpj.EndsWith(digit);
        }).WithMessage("Invalid CNPJ.");
    }

    public static IRuleBuilderOptions<T, string> MustBeValidCpf<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder.Must(cpf =>
        {
            if (string.IsNullOrWhiteSpace(cpf)) return false;
            var multiplicationTable1 = new[] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            var multiplicationTable2 = new[] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            cpf = cpf.Trim().Replace(".", "").Replace("-", "");
            if (cpf.Length != 11 || new string(cpf[0], 11) == cpf) return false;
            var tempCpf = cpf.Substring(0, 9);
            var sum = 0;
            for (var i = 0; i < 9; i++)
                sum += int.Parse(tempCpf[i].ToString()) * multiplicationTable1[i];
            var remainder = sum % 11;
            if (remainder < 2)
                remainder = 0;
            else
                remainder = 11 - remainder;
            var digit = remainder.ToString();
            tempCpf += digit;
            sum = 0;
            for (var i = 0; i < 10; i++)
                sum += int.Parse(tempCpf[i].ToString()) * multiplicationTable2[i];
            remainder = sum % 11;
            if (remainder < 2)
                remainder = 0;
            else
                remainder = 11 - remainder;
            digit += remainder.ToString();
            return cpf.EndsWith(digit);
        }).WithMessage("Invalid CPF.");
    }
}
