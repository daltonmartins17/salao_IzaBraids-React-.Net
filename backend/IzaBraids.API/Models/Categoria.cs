using System.ComponentModel.DataAnnotations;

namespace IzaBraids.API.Models;

public class Categoria
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Tipo { get; set; } = string.Empty; // "Servico" ou "Produto"
}