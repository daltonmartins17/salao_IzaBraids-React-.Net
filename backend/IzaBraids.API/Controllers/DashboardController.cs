using IzaBraids.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IzaBraids.API.Controllers;


[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context) => _context = context;

    [HttpGet]
    [HttpGet]
    public async Task<IActionResult> GetStats()
    {
        var totalMarcacoes = await _context.Marcacoes.CountAsync();
        var totalClientes = await _context.Clientes.CountAsync();
        var receitaTotal = await _context.Marcacoes
            .Where(m => m.Estado == "Confirmada")
            .SumAsync(m => m.Servico!.Preco);
        var totalPendentes = await _context.Marcacoes.CountAsync(m => m.Estado == "Pendente");

        var proximas = await _context.Marcacoes
            .Where(m => m.DataHora > DateTime.Now && m.Estado != "Cancelada")
            .OrderBy(m => m.DataHora)
            .Take(5)
            .Select(m => new { m.Id, m.DataHora, Cliente = m.Cliente!.Nome, Servico = m.Servico!.Nome })
            .ToListAsync();

        return Ok(new
        {
            totalMarcacoes,
            totalClientes,
            receitaTotal,
            totalPendentes,          
            proximasMarcacoes = proximas
        });
    }
}