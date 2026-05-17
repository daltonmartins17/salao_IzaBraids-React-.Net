using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.DTOs;

public class RegisterDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Email inválido.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A palavra-passe é obrigatória.")]
    [MinLength(6, ErrorMessage = "A palavra-passe deve ter pelo menos 6 caracteres.")]
    public string Password { get; set; } = string.Empty;
}

public class LoginDTO
{
    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A palavra-passe é obrigatória.")]
    public string Password { get; set; } = string.Empty;
}

public class AuthResponseDTO
{
    public string Token { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}