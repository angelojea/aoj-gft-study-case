using Application.Dtos;
using Application.Interfaces;
using System.Net.Http.Json;

namespace Infrastructure.Services;

public class ViaCepService : IViaCepService
{
    private readonly HttpClient _httpClient;

    public ViaCepService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<ViaCepResponse?> GetAddressByZipCodeAsync(string zipCode)
    {
        var response = await _httpClient.GetAsync($"{zipCode}/json/");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<ViaCepResponse>();
    }
}
