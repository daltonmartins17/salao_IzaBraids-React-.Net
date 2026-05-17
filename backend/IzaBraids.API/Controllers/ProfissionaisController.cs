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
public class ProfissionaisController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;

    public ProfissionaisController(AppDbContext context, IMapper mapper, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProfissionalDTO>>> GetAll()
    {
        var profissionais = await _context.Profissionais.Where(p => p.Ativo).ToListAsync();
        return Ok(_mapper.Map<IEnumerable<ProfissionalDTO>>(profissionais));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProfissionalDTO>> GetById(int id)
    {
        var profissional = await _context.Profissionais.FindAsync(id);
        if (profissional == null) return NotFound("Profissional não encontrado.");
        return Ok(_mapper.Map<ProfissionalDTO>(profissional));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProfissionalDTO>> Create([FromForm] ProfissionalCreateDTO dto, IFormFile? foto)
    {
        var profissional = _mapper.Map<Profissional>(dto);
        if (foto != null)
            profissional.FotoUrl = await _imageService.SaveImageAsync(foto, "profissionais");

        _context.Profissionais.Add(profissional);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = profissional.Id }, _mapper.Map<ProfissionalDTO>(profissional));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromForm] ProfissionalCreateDTO dto, IFormFile? foto)
    {
        var profissional = await _context.Profissionais.FindAsync(id);
        if (profissional == null) return NotFound("Profissional não encontrado.");

        _mapper.Map(dto, profissional);
        if (foto != null)
        {
            if (!string.IsNullOrEmpty(profissional.FotoUrl))
                _imageService.DeleteImage(profissional.FotoUrl);
            profissional.FotoUrl = await _imageService.SaveImageAsync(foto, "profissionais");
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var profissional = await _context.Profissionais.FindAsync(id);
        if (profissional == null) return NotFound("Profissional não encontrado.");

        profissional.Ativo = false;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}