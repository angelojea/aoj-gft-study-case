using Application.Dtos;

namespace Application.Interfaces;

public interface IViaCepService
{
    Task<ViaCepResponse?> GetAddressByZipCodeAsync(string zipCode);
}
