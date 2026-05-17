using IzaBraids.API.DTOs;

namespace IzaBraids.API.Services;

public interface IAuthService
{
    Task<AuthResponseDTO> Register(RegisterDTO dto);
    Task<AuthResponseDTO> Login(LoginDTO dto);
}