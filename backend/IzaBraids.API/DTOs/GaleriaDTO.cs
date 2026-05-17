using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.DTOs;

public class GaleriaCreateDTO
{
    [Required(ErrorMessage = "O título é obrigatório.")]
    [MaxLength(100)]
    public string Titulo { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Descricao { get; set; }

    [MaxLength(50)]
    public string? Categoria { get; set; }
}

public class GaleriaDTO : GaleriaCreateDTO
{
    public int Id { get; set; }
    public string ImagemUrl { get; set; } = string.Empty;
    public DateTime DataPublicacao { get; set; }
}