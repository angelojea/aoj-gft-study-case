namespace Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class Contact
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public string Cpf { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }

    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public Guid? CompanyId { get; set; }
    public Company? Company { get; set; }
}
