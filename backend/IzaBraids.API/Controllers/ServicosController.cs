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
public class ServicosController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;

    public ServicosController(AppDbContext context, IMapper mapper, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ServicoDTO>>> GetAll()
    {
        var servicos = await _context.Servicos.Where(s => s.Ativo).ToListAsync();
        return Ok(_mapper.Map<IEnumerable<ServicoDTO>>(servicos));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServicoDTO>> GetById(int id)
    {
        var servico = await _context.Servicos.FindAsync(id);
        if (servico == null) return NotFound("Serviço não encontrado.");
        return Ok(_mapper.Map<ServicoDTO>(servico));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ServicoDTO>> Create([FromForm] ServicoCreateDTO dto, IFormFile? imagem)
    {
        var servico = _mapper.Map<Servico>(dto);
        if (imagem != null)
            servico.ImagemUrl = await _imageService.SaveImageAsync(imagem, "servicos");

        _context.Servicos.Add(servico);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = servico.Id }, _mapper.Map<ServicoDTO>(servico));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromForm] ServicoCreateDTO dto, IFormFile? imagem)
    {
        var servico = await _context.Servicos.FindAsync(id);
        if (servico == null) return NotFound("Serviço não encontrado.");

        _mapper.Map(dto, servico);
        if (imagem != null)
        {
            if (!string.IsNullOrEmpty(servico.ImagemUrl))
                _imageService.DeleteImage(servico.ImagemUrl);
            servico.ImagemUrl = await _imageService.SaveImageAsync(imagem, "servicos");
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var servico = await _context.Servicos.FindAsync(id);
        if (servico == null) return NotFound("Serviço não encontrado.");

        servico.Ativo = false;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}