using Application.Interfaces;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AddressesController : ControllerBase
{
    private readonly AddressService _addressService;
    private readonly IViaCepService _viaCepService;

    public AddressesController(AddressService addressService, IViaCepService viaCepService)
    {
        _addressService = addressService;
        _viaCepService = viaCepService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var addresses = await _addressService.GetAllAddressesAsync();
        return Ok(addresses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var address = await _addressService.GetAddressByIdAsync(id);
        if (address == null)
        {
            return NotFound();
        }
        return Ok(address);
    }

    [HttpPost]
    public async Task<IActionResult> CreateFromZip(string zipCode)
    {
        var viaCepAddress = await _viaCepService.GetAddressByZipCodeAsync(zipCode);
        if (viaCepAddress == null)
        {
            return NotFound("Zip code not found.");
        }

        var address = new Address
        {
            Zip = viaCepAddress.Cep.Replace("-", ""),
            Street = viaCepAddress.Logradouro,
            Complement = viaCepAddress.Complemento,
            Neighborhood = viaCepAddress.Bairro,
            City = viaCepAddress.Localidade,
            Uf = viaCepAddress.Uf,
            Ibge = viaCepAddress.Ibge,
            Gia = viaCepAddress.Gia,
            Ddd = viaCepAddress.Ddd,
            Siafi = viaCepAddress.Siafi
        };

        await _addressService.AddAddressAsync(address);
        return CreatedAtAction(nameof(GetById), new { id = address.Id }, address);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _addressService.DeleteAddressAsync(id);
        return NoContent();
    }
}
