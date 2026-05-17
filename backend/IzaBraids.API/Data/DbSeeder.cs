using IzaBraids.API.Models;
using Microsoft.EntityFrameworkCore;

namespace IzaBraids.API.Data;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (context.Servicos.Any()) return;

        // Utilizador admin
        if (!context.Utilizadores.Any())
        {
            var admin = new Utilizador
            {
                Nome = "Admin IzaBraids",
                Email = "admin@izabraids.pt",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                Role = "Admin"
            };
            context.Utilizadores.Add(admin);
        }

        // Serviços
        var servicos = new List<Servico>
        {
            new() { Nome = "Tranças Box Braids", Descricao = "Tranças box braids tradicionais.", Preco = 45.00m, DuracaoMinutos = 120, Categoria = "Tranças" },
            new() { Nome = "Penteados para Noivas", Descricao = "Penteados elegantes para o grande dia.", Preco = 60.00m, DuracaoMinutos = 90, Categoria = "Penteados" },
            new() { Nome = "Alisamento", Descricao = "Alisamento profissional com queratina.", Preco = 80.00m, DuracaoMinutos = 150, Categoria = "Químicos" },
            new() { Nome = "Corte Feminino", Descricao = "Corte personalizado.", Preco = 25.00m, DuracaoMinutos = 45, Categoria = "Cortes" },
            new() { Nome = "Coloração", Descricao = "Coloração completa.", Preco = 55.00m, DuracaoMinutos = 100, Categoria = "Químicos" }
        };
        context.Servicos.AddRange(servicos);

        // Produtos (10)
        var produtos = new List<Produto>
        {
            new() { Nome = "Shampoo Hidratante IzaBraids", Descricao = "Shampoo suave para cabelos trançados.", Preco = 12.50m, Stock = 30, Categoria = "Cuidados" },
            new() { Nome = "Condicionador Leave-in", Descricao = "Leave-in sem enxaguamento.", Preco = 15.00m, Stock = 20, Categoria = "Cuidados" },
            new() { Nome = "Óleo de Coco", Descricao = "Óleo 100% natural.", Preco = 8.90m, Stock = 50, Categoria = "Óleos" },
            new() { Nome = "Spray Fixador", Descricao = "Spray de fixação forte.", Preco = 9.99m, Stock = 25, Categoria = "Fixação" },
            new() { Nome = "Cera Modeladora", Descricao = "Cera para penteados.", Preco = 7.50m, Stock = 15, Categoria = "Modelação" },
            new() { Nome = "Kit de Tranças Sintéticas", Descricao = "Pacote com 5 cores.", Preco = 22.00m, Stock = 10, Categoria = "Acessórios" },
            new() { Nome = "Pente de Madeira", Descricao = "Pente artesanal.", Preco = 6.00m, Stock = 40, Categoria = "Acessórios" },
            new() { Nome = "Touca de Cetim", Descricao = "Touca para dormir.", Preco = 10.00m, Stock = 35, Categoria = "Acessórios" },
            new() { Nome = "Máscara Reconstrutora", Descricao = "Tratamento intensivo.", Preco = 18.00m, Stock = 20, Categoria = "Cuidados" },
            new() { Nome = "Escova Desembaraçante", Descricao = "Escova flexível.", Preco = 11.50m, Stock = 25, Categoria = "Acessórios" }
        };
        context.Produtos.AddRange(produtos);

        // Profissionais
        var profissionais = new List<Profissional>
        {
            new() { Nome = "Isabela Santos", Especialidade = "Trancista", Biografia = "Especialista em tranças africanas." },
            new() { Nome = "Mariana Costa", Especialidade = "Cabeleireira", Biografia = "Penteados e coloração." },
            new() { Nome = "Carla Oliveira", Especialidade = "Maquiadora", Biografia = "Maquilhagem profissional." }
        };
        context.Profissionais.AddRange(profissionais);

        // Categorias
        var categorias = new List<Categoria>
        {
            new() { Nome = "Tranças", Tipo = "Servico" },
            new() { Nome = "Penteados", Tipo = "Servico" },
            new() { Nome = "Químicos", Tipo = "Servico" },
            new() { Nome = "Cortes", Tipo = "Servico" },
            new() { Nome = "Cuidados", Tipo = "Produto" },
            new() { Nome = "Óleos", Tipo = "Produto" },
            new() { Nome = "Fixação", Tipo = "Produto" }
        };
        context.Categorias.AddRange(categorias);

        // Cliente exemplo
        var cliente = new Cliente { Nome = "Maria Silva", Email = "maria@email.pt", Telefone = "912345678" };
        context.Clientes.Add(cliente);

        context.SaveChanges();
    }
}