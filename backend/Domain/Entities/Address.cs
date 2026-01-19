namespace Domain.Entities;

using System.ComponentModel.DataAnnotations;

public class Address
{
    public Guid Id { get; set; }

    [Required]
    [StringLength(8, MinimumLength = 8)]
    public string Zip { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Street { get; set; } = string.Empty;

    [StringLength(50, MinimumLength = 5)]
    public string? Complement { get; set; }

    [StringLength(100, MinimumLength = 5)]
    public string? Unity { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string Neighborhood { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 5)]
    public string City { get; set; } = string.Empty;

    [Required]
    [StringLength(2, MinimumLength = 2)]
    public string Uf { get; set; } = string.Empty;

    [Required]
    [StringLength(50, MinimumLength = 5)]
    public string State { get; set; } = string.Empty;

    [StringLength(50, MinimumLength = 5)]
    public string? Region { get; set; }

    [StringLength(7, MinimumLength = 7)]
    public string? Ibge { get; set; }

    [StringLength(50, MinimumLength = 5)]
    public string? Gia { get; set; }

    [StringLength(8, MinimumLength = 8)]
    public string? Ddd { get; set; }

    [StringLength(6, MinimumLength = 5)]
    public string? Siafi { get; set; }
}
