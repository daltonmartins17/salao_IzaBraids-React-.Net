namespace IzaBraids.API.Services;

public class MockEmailService : IEmailService
{
    private readonly ILogger<MockEmailService> _logger;

    public MockEmailService(ILogger<MockEmailService> logger) => _logger = logger;

    public Task SendConfirmationAsync(string to, string clienteNome, DateTime dataHora, string servico)
    {
        _logger.LogInformation(
            "[EMAIL MOCK] Para: {Email}, Olá {Nome}, a sua marcação no IzaBraids para {Servico} no dia {Data} foi confirmada. Obrigado!",
            to, clienteNome, servico, dataHora.ToString("dd/MM/yyyy HH:mm"));
        return Task.CompletedTask;
    }
}