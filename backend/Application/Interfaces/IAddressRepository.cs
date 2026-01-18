using Domain.Entities;

namespace Application.Interfaces;

public interface IAddressRepository
{
    Task<IEnumerable<Address>> GetAllAsync();
    Task<Address?> GetByIdAsync(Guid id);
    Task AddAsync(Address address);
    Task UpdateAsync(Address address);
    Task DeleteAsync(Guid id);
}
