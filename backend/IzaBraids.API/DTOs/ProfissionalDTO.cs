using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.DTOs;

public class ProfissionalCreateDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Especialidade { get; set; }

    [MaxLength(500)]
    public string? Biografia { get; set; }
}

public class ProfissionalDTO : ProfissionalCreateDTO
{
    public int Id { get; set; }
    public string? FotoUrl { get; set; }
    public bool Ativo { get; set; }
}