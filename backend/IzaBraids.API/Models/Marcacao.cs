using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.Models;

public class Marcacao
{
    public int Id { get; set; }

    [Required]
    public int ClienteId { get; set; }
    public Cliente? Cliente { get; set; }

    [Required]
    public int ServicoId { get; set; }
    public Servico? Servico { get; set; }

    public int ProfissionalId { get; set; }
    public Profissional? Profissional { get; set; }

    [Required(ErrorMessage = "A data e hora são obrigatórias.")]
    public DateTime DataHora { get; set; }

    [MaxLength(50)]
    public string Estado { get; set; } = "Pendente"; // Pendente, Confirmada, Cancelada

    [MaxLength(500)]
    public string? Observacoes { get; set; }
}