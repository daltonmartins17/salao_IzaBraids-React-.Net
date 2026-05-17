using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.DTOs;

public class ServicoCreateDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    [Required(ErrorMessage = "O preço é obrigatório.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Preço inválido.")]
    public decimal Preco { get; set; }

    [Required(ErrorMessage = "A duração é obrigatória.")]
    [Range(1, 480, ErrorMessage = "Duração entre 1 e 480 minutos.")]
    public int DuracaoMinutos { get; set; }

    [MaxLength(50)]
    public string? Categoria { get; set; }
}

public class ServicoDTO : ServicoCreateDTO
{
    public int Id { get; set; }
    public string? ImagemUrl { get; set; }
    public bool Ativo { get; set; }
}