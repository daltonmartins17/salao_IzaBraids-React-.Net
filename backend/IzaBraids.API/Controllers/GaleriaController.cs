using AutoMapper;
using IzaBraids.API.Data;
using IzaBraids.API.DTOs;
using IzaBraids.API.Models;
using IzaBraids.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace IzaBraids.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GaleriaController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;

    public GaleriaController(AppDbContext context, IMapper mapper, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GaleriaDTO>>> GetAll()
    {
        var imagens = await _context.Galerias.OrderByDescending(g => g.DataPublicacao).ToListAsync();
        return Ok(_mapper.Map<IEnumerable<GaleriaDTO>>(imagens));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<GaleriaDTO>> Create([FromForm] GaleriaCreateDTO dto, IFormFile imagem)
    {
        var galeria = _mapper.Map<Galeria>(dto);
        galeria.ImagemUrl = await _imageService.SaveImageAsync(imagem, "galeria");
        galeria.DataPublicacao = DateTime.UtcNow;

        _context.Galerias.Add(galeria);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = galeria.Id }, _mapper.Map<GaleriaDTO>(galeria));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var galeria = await _context.Galerias.FindAsync(id);
        if (galeria == null) return NotFound("Imagem não encontrada.");

        _imageService.DeleteImage(galeria.ImagemUrl);
        _context.Galerias.Remove(galeria);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}