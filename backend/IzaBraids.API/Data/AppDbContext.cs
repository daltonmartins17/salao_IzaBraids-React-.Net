using IzaBraids.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IzaBraids.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Servico> Servicos => Set<Servico>();
    public DbSet<Produto> Produtos => Set<Produto>();
    public DbSet<Profissional> Profissionais => Set<Profissional>();
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Marcacao> Marcacoes => Set<Marcacao>();
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Galeria> Galerias => Set<Galeria>();
    public DbSet<Utilizador> Utilizadores => Set<Utilizador>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        // Força todas as propriedades DateTime a serem lidas/escritas como Local
        configurationBuilder.Properties<DateTime>()
            .HaveConversion(typeof(DateTimeToLocalConverter));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Marcacao>()
            .HasOne(m => m.Cliente)
            .WithMany()
            .HasForeignKey(m => m.ClienteId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Marcacao>()
            .HasOne(m => m.Servico)
            .WithMany()
            .HasForeignKey(m => m.ServicoId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Marcacao>()
            .HasOne(m => m.Profissional)
            .WithMany()
            .HasForeignKey(m => m.ProfissionalId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configurações de precisão decimal (já existentes)
        modelBuilder.Entity<Servico>()
            .Property(s => s.Preco)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Produto>()
            .Property(p => p.Preco)
            .HasPrecision(18, 2);
    }
}

// Conversor para forçar DateTimeKind.Local
public class DateTimeToLocalConverter : ValueConverter<DateTime, DateTime>
{
    public DateTimeToLocalConverter()
        : base(
            v => v.Kind == DateTimeKind.Local ? v : DateTime.SpecifyKind(v, DateTimeKind.Local),
            v => DateTime.SpecifyKind(v, DateTimeKind.Local))
    { }
}