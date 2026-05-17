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
public class MarcacoesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;

    public MarcacoesController(AppDbContext context, IMapper mapper, IEmailService emailService)
    {
        _context = context;
        _mapper = mapper;
        _emailService = emailService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MarcacaoDTO>>> GetAll()
    {
        var marcacoes = await _context.Marcacoes
            .Include(m => m.Cliente)
            .Include(m => m.Servico)
            .Include(m => m.Profissional)
            .OrderByDescending(m => m.DataHora)
            .ToListAsync();
        return Ok(_mapper.Map<IEnumerable<MarcacaoDTO>>(marcacoes));
    }

    [HttpGet("disponibilidade")]
    public async Task<ActionResult> GetDisponibilidade([FromQuery] string data, [FromQuery] int profissionalId)
    {
        // Converte a string "yyyy-MM-dd" para DateTime local (meia-noite)
        if (!DateTime.TryParse(data, out DateTime dataEscolhida))
            return BadRequest("Formato de data inválido.");

        // Garante que a data é local (hora local)
        dataEscolhida = DateTime.SpecifyKind(dataEscolhida, DateTimeKind.Local);
        var inicioDia = dataEscolhida.Date;
        var fimDia = inicioDia.AddDays(1);

        // Busca os horários ocupados (não cancelados) para o profissional nesse dia
        var ocupados = await _context.Marcacoes
            .Where(m => m.ProfissionalId == profissionalId &&
                        m.DataHora >= inicioDia &&
                        m.DataHora < fimDia &&
                        m.Estado != "Cancelada")
            .Select(m => m.DataHora)
            .ToListAsync();

        // Gera slots das 09:00 às 19:00, de 30 em 30 minutos
        var horarios = new List<DateTime>();
        var horaAtual = inicioDia.AddHours(9);
        var horaFim = inicioDia.AddHours(19);

        while (horaAtual < horaFim)
        {
            if (!ocupados.Any(o => o == horaAtual))
                horarios.Add(horaAtual);
            horaAtual = horaAtual.AddMinutes(30);
        }

        return Ok(horarios);
    }

    [HttpPost]
    public async Task<ActionResult<MarcacaoDTO>> Create(MarcacaoCreateDTO dto)
    {
        // Validar conflito
        var conflito = await _context.Marcacoes.AnyAsync(m =>
            m.ProfissionalId == dto.ProfissionalId &&
            m.DataHora == dto.DataHora &&
            m.Estado != "Cancelada");
        if (conflito) return BadRequest("Horário já ocupado.");

        var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == dto.Email)
                      ?? new Cliente { Nome = dto.Nome, Email = dto.Email, Telefone = dto.Telefone };
        if (cliente.Id == 0) _context.Clientes.Add(cliente);

        var marcacao = new Marcacao
        {
            Cliente = cliente,
            ServicoId = dto.ServicoId,
            ProfissionalId = dto.ProfissionalId,
            DataHora = dto.DataHora,
            Observacoes = dto.Observacoes
        };

        _context.Marcacoes.Add(marcacao);
        await _context.SaveChangesAsync();

        await _emailService.SendConfirmationAsync(cliente.Email, cliente.Nome, marcacao.DataHora, "");

        return CreatedAtAction(nameof(GetAll), new { id = marcacao.Id }, _mapper.Map<MarcacaoDTO>(marcacao));
    }

    [HttpPut("{id}/estado")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateEstado(int id, [FromBody] string estado)
    {
        var marcacao = await _context.Marcacoes.FindAsync(id);
        if (marcacao == null) return NotFound();
        marcacao.Estado = estado;
        await _context.SaveChangesAsync();
        return NoContent();
    }
}