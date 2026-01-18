using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class CompanyService
{
    private readonly ICompanyRepository _companyRepository;

    public CompanyService(ICompanyRepository companyRepository)
    {
        _companyRepository = companyRepository;
    }

    public Task<IEnumerable<Company>> GetAllCompaniesAsync() => _companyRepository.GetAllAsync();

    public Task<Company?> GetCompanyByIdAsync(Guid id) => _companyRepository.GetByIdAsync(id);

    public Task AddCompanyAsync(Company company) => _companyRepository.AddAsync(company);

    public Task UpdateCompanyAsync(Company company) => _companyRepository.UpdateAsync(company);

    public Task DeleteCompanyAsync(Guid id) => _companyRepository.DeleteAsync(id);
}
