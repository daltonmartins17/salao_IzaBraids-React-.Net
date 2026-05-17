using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.DTOs;

public class MarcacaoCreateDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telefone é obrigatório.")]
    public string Telefone { get; set; } = string.Empty;

    [Required]
    public int ServicoId { get; set; }

    [Required]
    public int ProfissionalId { get; set; }

    [Required]
    public DateTime DataHora { get; set; }

    public string? Observacoes { get; set; }
}

public class MarcacaoDTO
{
    public int Id { get; set; }
    public string NomeCliente { get; set; } = string.Empty;
    public string NomeServico { get; set; } = string.Empty;
    public string NomeProfissional { get; set; } = string.Empty;
    public DateTime DataHora { get; set; }
    public string Estado { get; set; } = string.Empty;
    public string? Observacoes { get; set; }
}