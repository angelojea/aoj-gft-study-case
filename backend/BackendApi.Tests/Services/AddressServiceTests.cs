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

public class AddressServiceTests
{
    private readonly Mock<IAddressRepository> _addressRepositoryMock;
    private readonly AddressService _addressService;
    private readonly AddressValidator _validator;

    public AddressServiceTests()
    {
        _addressRepositoryMock = new Mock<IAddressRepository>();
        _addressService = new AddressService(_addressRepositoryMock.Object);
        _validator = new AddressValidator();
    }

    [Fact]
    public async Task GetAllAddressesAsync_ShouldReturnAllAddresses()
    {
        // Arrange
        var addresses = new List<Address> { new Address { Id = Guid.NewGuid(), Street = "Test Street" } };
        _addressRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(addresses);

        // Act
        var result = await _addressService.GetAllAddressesAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal(addresses, result);
    }

    [Fact]
    public async Task GetAddressByIdAsync_ShouldReturnAddress_WhenAddressExists()
    {
        // Arrange
        var addressId = Guid.NewGuid();
        var address = new Address { Id = addressId, Street = "Test Street" };
        _addressRepositoryMock.Setup(repo => repo.GetByIdAsync(addressId)).ReturnsAsync(address);

        // Act
        var result = await _addressService.GetAddressByIdAsync(addressId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(addressId, result.Id);
    }

    [Fact]
    public async Task GetAddressByIdAsync_ShouldReturnNull_WhenAddressDoesNotExist()
    {
        // Arrange
        _addressRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Address?)null);

        // Act
        var result = await _addressService.GetAddressByIdAsync(Guid.NewGuid());

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_Have_Error_When_Zip_Is_Not_8_Digits()
    {
        var address = new Address { Zip = "1234567" };
        var result = _validator.TestValidate(address);
        result.ShouldHaveValidationErrorFor(a => a.Zip);
    }

    [Fact]
    public void Should_Have_Error_When_Uf_Is_Not_2_Letters()
    {
        var address = new Address { Uf = "A" };
        var result = _validator.TestValidate(address);
        result.ShouldHaveValidationErrorFor(a => a.Uf);
    }
}
