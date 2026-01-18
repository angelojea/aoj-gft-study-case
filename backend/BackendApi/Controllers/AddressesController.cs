using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AddressesController : ControllerBase
{
    private readonly AddressService _addressService;

    public AddressesController(AddressService addressService)
    {
        _addressService = addressService;
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
    public async Task<IActionResult> Create(Address address)
    {
        await _addressService.AddAddressAsync(address);
        return CreatedAtAction(nameof(GetById), new { id = address.Id }, address);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Address address)
    {
        if (id != address.Id)
        {
            return BadRequest();
        }

        await _addressService.UpdateAddressAsync(address);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _addressService.DeleteAddressAsync(id);
        return NoContent();
    }
}
