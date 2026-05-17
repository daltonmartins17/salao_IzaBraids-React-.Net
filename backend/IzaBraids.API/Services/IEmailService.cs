namespace IzaBraids.API.Services;

public interface IEmailService
{
    Task SendConfirmationAsync(string to, string clienteNome, DateTime dataHora, string servico);
}