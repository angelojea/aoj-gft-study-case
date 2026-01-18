using Application.Interfaces;
using Application.Services;
using Application.Validators;
using Domain.Entities;
using Moq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using FluentValidation.TestHelper;

namespace BackendApi.Tests.Services;

public class CompanyServiceTests
{
    private readonly Mock<ICompanyRepository> _companyRepositoryMock;
    private readonly CompanyService _companyService;
    private readonly CompanyValidator _validator;

    public CompanyServiceTests()
    {
        _companyRepositoryMock = new Mock<ICompanyRepository>();
        _companyService = new CompanyService(_companyRepositoryMock.Object);
        _validator = new CompanyValidator();
    }

    [Fact]
    public async Task GetAllCompaniesAsync_ShouldReturnAllCompanies()
    {
        // Arrange
        var companies = new List<Company> { new Company { Id = Guid.NewGuid(), Name = "Test Company" } };
        _companyRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(companies);

        // Act
        var result = await _companyService.GetAllCompaniesAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal(companies, result);
    }

    [Fact]
    public async Task GetCompanyByIdAsync_ShouldReturnCompany_WhenCompanyExists()
    {
        // Arrange
        var companyId = Guid.NewGuid();
        var company = new Company { Id = companyId, Name = "Test Company" };
        _companyRepositoryMock.Setup(repo => repo.GetByIdAsync(companyId)).ReturnsAsync(company);

        // Act
        var result = await _companyService.GetCompanyByIdAsync(companyId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(companyId, result.Id);
    }

    [Fact]
    public async Task GetCompanyByIdAsync_ShouldReturnNull_WhenCompanyDoesNotExist()
    {
        // Arrange
        _companyRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Company?)null);

        // Act
        var result = await _companyService.GetCompanyByIdAsync(Guid.NewGuid());

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_Have_Error_When_Name_Is_Shorter_Than_5_Characters()
    {
        var company = new Company { Name = "Test" };
        var result = _validator.TestValidate(company);
        result.ShouldHaveValidationErrorFor(c => c.Name);
    }

    [Fact]
    public void Should_Have_Error_When_Cnpj_Is_Invalid()
    {
        var company = new Company { Cnpj = "123" };
        var result = _validator.TestValidate(company);
        result.ShouldHaveValidationErrorFor(c => c.Cnpj);
    }
}
