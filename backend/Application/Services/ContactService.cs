using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class ContactService
{
    private readonly IContactRepository _contactRepository;
    public ContactService(IContactRepository contactRepository)
    {
        _contactRepository = contactRepository;
    }

    public Task<IEnumerable<Contact>> GetAllContactsAsync() => _contactRepository.GetAllAsync();

    public Task<Contact?> GetContactByIdAsync(Guid id) => _contactRepository.GetByIdAsync(id);

    public async Task AddContactAsync(Contact contact)
    {
        await _contactRepository.AddAsync(contact);
    }

    public Task UpdateContactAsync(Contact contact) => _contactRepository.UpdateAsync(contact);

    public Task DeleteContactAsync(Guid id) => _contactRepository.DeleteAsync(id);
}
