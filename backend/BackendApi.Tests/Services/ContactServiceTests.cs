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

public class ContactServiceTests
{
    private readonly Mock<IContactRepository> _contactRepositoryMock;
    private readonly ContactService _contactService;
    private readonly ContactValidator _validator;

    public ContactServiceTests()
    {
        _contactRepositoryMock = new Mock<IContactRepository>();
        _contactService = new ContactService(_contactRepositoryMock.Object);
        _validator = new ContactValidator();
    }

    [Fact]
    public async Task GetAllContactsAsync_ShouldReturnAllContacts()
    {
        // Arrange
        var contacts = new List<Contact> { new Contact { Id = Guid.NewGuid(), FirstName = "Test", LastName = "Contact" } };
        _contactRepositoryMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(contacts);

        // Act
        var result = await _contactService.GetAllContactsAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal(contacts, result);
    }

    [Fact]
    public async Task GetContactByIdAsync_ShouldReturnContact_WhenContactExists()
    {
        // Arrange
        var contactId = Guid.NewGuid();
        var contact = new Contact { Id = contactId, FirstName = "Test", LastName = "Contact" };
        _contactRepositoryMock.Setup(repo => repo.GetByIdAsync(contactId)).ReturnsAsync(contact);

        // Act
        var result = await _contactService.GetContactByIdAsync(contactId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(contactId, result.Id);
    }

    [Fact]
    public async Task GetContactByIdAsync_ShouldReturnNull_WhenContactDoesNotExist()
    {
        // Arrange
        _contactRepositoryMock.Setup(repo => repo.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((Contact?)null);

        // Act
        var result = await _contactService.GetContactByIdAsync(Guid.NewGuid());

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public void Should_Have_Error_When_FirstName_Is_Shorter_Than_5_Characters()
    {
        var contact = new Contact { FirstName = "Test" };
        var result = _validator.TestValidate(contact);
        result.ShouldHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Have_Error_When_Cpf_Is_Invalid()
    {
        var contact = new Contact { Cpf = "123" };
        var result = _validator.TestValidate(contact);
        result.ShouldHaveValidationErrorFor(c => c.Cpf);
    }

    [Fact]
    public void Should_Have_Error_When_DateOfBirth_Is_Less_Than_10_Years_Ago()
    {
        var contact = new Contact { DateOfBirth = DateTime.Now.AddYears(-9) };
        var result = _validator.TestValidate(contact);
        result.ShouldHaveValidationErrorFor(c => c.DateOfBirth);
    }
}
