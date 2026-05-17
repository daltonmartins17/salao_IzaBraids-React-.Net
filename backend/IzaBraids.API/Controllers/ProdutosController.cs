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
public class ProdutosController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;

    public ProdutosController(AppDbContext context, IMapper mapper, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProdutoDTO>>> GetAll()
    {
        var produtos = await _context.Produtos.Where(p => p.Ativo).ToListAsync();
        return Ok(_mapper.Map<IEnumerable<ProdutoDTO>>(produtos));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProdutoDTO>> GetById(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return NotFound("Produto não encontrado.");
        return Ok(_mapper.Map<ProdutoDTO>(produto));
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ProdutoDTO>> Create([FromForm] ProdutoCreateDTO dto, IFormFile? imagem)
    {
        var produto = _mapper.Map<Produto>(dto);
        if (imagem != null)
            produto.ImagemUrl = await _imageService.SaveImageAsync(imagem, "produtos");

        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = produto.Id }, _mapper.Map<ProdutoDTO>(produto));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromForm] ProdutoCreateDTO dto, IFormFile? imagem)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return NotFound("Produto não encontrado.");

        _mapper.Map(dto, produto);
        if (imagem != null)
        {
            if (!string.IsNullOrEmpty(produto.ImagemUrl))
                _imageService.DeleteImage(produto.ImagemUrl);
            produto.ImagemUrl = await _imageService.SaveImageAsync(imagem, "produtos");
        }
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return NotFound("Produto não encontrado.");

        produto.Ativo = false;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}