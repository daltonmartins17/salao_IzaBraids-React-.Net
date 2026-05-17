using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IzaBraids.API.Data;
using IzaBraids.API.DTOs;
using IzaBraids.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace IzaBraids.API.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<AuthResponseDTO> Register(RegisterDTO dto)
    {
        if (await _db.Utilizadores.AnyAsync(u => u.Email == dto.Email))
            throw new InvalidOperationException("Email já registado.");

        var user = new Utilizador
        {
            Nome = dto.Nome,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Funcionario"
        };

        _db.Utilizadores.Add(user);
        await _db.SaveChangesAsync();
        return GenerateToken(user);
    }

    public async Task<AuthResponseDTO> Login(LoginDTO dto)
    {
        var user = await _db.Utilizadores.FirstOrDefaultAsync(u => u.Email == dto.Email)
                   ?? throw new UnauthorizedAccessException("Credenciais inválidas.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Credenciais inválidas.");

        return GenerateToken(user);
    }

    private AuthResponseDTO GenerateToken(Utilizador user)
    {
        var jwtSettings = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("nome", user.Nome)
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpireMinutes"]!)),
            signingCredentials: creds
        );

        return new AuthResponseDTO
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Nome = user.Nome,
            Email = user.Email,
            Role = user.Role
        };
    }
}