using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.DTOs;

public class ProdutoCreateDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Descricao { get; set; }

    [Required(ErrorMessage = "O preço é obrigatório.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Preço inválido.")]
    public decimal Preco { get; set; }

    public int Stock { get; set; }

    [MaxLength(50)]
    public string? Categoria { get; set; }
}

public class ProdutoDTO : ProdutoCreateDTO
{
    public int Id { get; set; }
    public string? ImagemUrl { get; set; }
    public bool Ativo { get; set; }
}