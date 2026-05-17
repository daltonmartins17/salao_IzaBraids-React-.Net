using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.Models;

public class Produto
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    [Required(ErrorMessage = "O preço é obrigatório.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "O preço deve ser maior que zero.")]
    public decimal Preco { get; set; }

    public int Stock { get; set; }

    [MaxLength(50)]
    public string? Categoria { get; set; }

    [MaxLength(200)]
    public string? ImagemUrl { get; set; }

    public bool Ativo { get; set; } = true;
}