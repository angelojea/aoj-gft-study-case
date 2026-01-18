using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class AddressService
{
    private readonly IAddressRepository _addressRepository;
    public AddressService(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public Task<IEnumerable<Address>> GetAllAddressesAsync() => _addressRepository.GetAllAsync();

    public Task<Address?> GetAddressByIdAsync(Guid id) => _addressRepository.GetByIdAsync(id);

    public async Task AddAddressAsync(Address address)
    {
        await _addressRepository.AddAsync(address);
    }

    public Task UpdateAddressAsync(Address address) => _addressRepository.UpdateAsync(address);

    public Task DeleteAddressAsync(Guid id) => _addressRepository.DeleteAsync(id);
}
