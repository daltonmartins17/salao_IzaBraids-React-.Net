using IzaBraids.API.DTOs;
using IzaBraids.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace IzaBraids.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService) => _authService = authService;

    [HttpPost("registar")]
    public async Task<ActionResult<AuthResponseDTO>> Registrar(RegisterDTO dto)
    {
        var result = await _authService.Register(dto);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDTO>> Login(LoginDTO dto)
    {
        var result = await _authService.Login(dto);
        return Ok(result);
    }
}