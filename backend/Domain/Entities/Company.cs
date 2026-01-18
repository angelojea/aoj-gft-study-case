namespace Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class Company
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Cnpj { get; set; } = string.Empty;

    [Required]
    public DateTime DateFounded { get; set; }

    public Address? Address { get; set; }
    public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
}
