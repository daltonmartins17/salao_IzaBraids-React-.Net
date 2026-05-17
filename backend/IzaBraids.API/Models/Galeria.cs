using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.Models;

public class Galeria
{
    public int Id { get; set; }

    [Required(ErrorMessage = "O título é obrigatório.")]
    [MaxLength(100)]
    public string Titulo { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Descricao { get; set; }

    [Required(ErrorMessage = "A imagem é obrigatória.")]
    [MaxLength(200)]
    public string ImagemUrl { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Categoria { get; set; }

    public DateTime DataPublicacao { get; set; } = DateTime.UtcNow;
}