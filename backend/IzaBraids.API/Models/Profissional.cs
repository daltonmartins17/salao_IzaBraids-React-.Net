using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.Models;

public class Profissional
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Especialidade { get; set; }

    [MaxLength(200)]
    public string? FotoUrl { get; set; }

    [MaxLength(500)]
    public string? Biografia { get; set; }

    public bool Ativo { get; set; } = true;
}