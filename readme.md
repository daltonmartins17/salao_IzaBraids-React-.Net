# IzaBraids — Sistema de Gestão de Salão

**Desenvolvido por Dalton Martins**

Sistema web completo para o salão de beleza **IzaBraids**, composto por:
- **API REST** em **.NET 8** (ASP.NET Core)
- **Interface** em **React** (Vite + Tailwind)

Permite a gestão de **serviços**, **produtos**, **profissionais**, **galeria** de imagens e **marcações online**, com uma área administrativa protegida e notificações ao admin.

---

## 🚀 Tecnologias Utilizadas

### Backend
- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core (MySQL)
- Autenticação **JWT**
- Swagger (documentação interativa)
- Serilog (logging estruturado)
- AutoMapper
- BCrypt.Net

### Frontend
- React 18 + Vite (JavaScript)
- Tailwind CSS
- React Router v6
- TanStack Query
- React Hook Form + Zod
- Axios
- Recharts (gráficos)
- React DatePicker, React Hot Toast, React Icons
- Yet Another React Lightbox

### Base de Dados
- MySQL 8.0 (ou MariaDB)

---

## 📋 Pré‑requisitos

- **Node.js 18+**: https://nodejs.org/
- **.NET SDK 8.0**: https://dotnet.microsoft.com/download/dotnet/8.0
- **MySQL Server**: https://dev.mysql.com/downloads/mysql/
- **Git** (opcional): https://git-scm.com/

---

## 🛠️ Configuração da Base de Dados (MySQL)

Execute o script abaixo no seu cliente MySQL (HeidiSQL, terminal, phpMyAdmin, etc.):

```sql
CREATE DATABASE IF NOT EXISTS salao;
CREATE USER IF NOT EXISTS 'salao'@'localhost' IDENTIFIED BY '12345';
GRANT ALL PRIVILEGES ON salao.* TO 'salao'@'localhost';
FLUSH PRIVILEGES;
```

A string de ligação está configurada em:

- `backend/IzaBraids.API/appsettings.json`

Exemplo (ajuste se necessário):

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=salao;User=salao;Password=12345;"
}
```

---

## ⚙️ Como Executar o Backend

1. Abra um terminal na pasta:
   - `backend/IzaBraids.API`

2. Execute:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

3. A API ficará disponível em:
- **HTTP**: http://localhost:5000
- **HTTPS**: https://localhost:5001

4. Swagger:
- http://localhost:5000/swagger

### Seed de administrador

O sistema cria automaticamente as credenciais de admin (seed):
- **Email**: admin@izabraids.pt
- **Palavra‑passe**: Admin123!

---

## 💻 Como Executar o Frontend

1. Abra outro terminal na pasta:
   - `frontend`

2. Execute:

```bash
npm install
npm run dev
```

3. A aplicação React fica disponível em:
- http://localhost:5173

O frontend comunica com a API através de proxy/Vite (configurado no projeto).

---

## 📁 Estrutura do Projeto

```text
iza-braids/
├── README.md
├── backend/
│   ├── IzaBraids.sln
│   └── IzaBraids.API/
│       ├── Controllers/
│       ├── Models/
│       ├── DTOs/
│       ├── Data/
│       ├── Services/
│       ├── Middleware/
│       ├── Mappings/
│       ├── Program.cs
│       └── appsettings.json
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/
        ├── context/
        ├── hooks/
        ├── components/
        ├── pages/
        └── utils/
```

---

## 🔌 Principais Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/registar` | Registar novo utilizador |
| POST | `/api/auth/login` | Login e obtenção de token JWT |
| GET | `/api/servicos` | Listar serviços ativos |
| POST | `/api/servicos` | Criar serviço (admin) |
| PUT | `/api/servicos/{id}` | Atualizar serviço (admin) |
| DELETE | `/api/servicos/{id}` | Desativar serviço (soft delete) |
| GET | `/api/produtos` | Listar produtos ativos |
| POST | `/api/produtos` | Criar produto (admin) |
| PUT | `/api/produtos/{id}` | Atualizar produto (admin) |
| DELETE | `/api/produtos/{id}` | Desativar produto (soft delete) |
| GET | `/api/profissionais` | Listar profissionais ativos |
| POST | `/api/profissionais` | Criar profissional (admin) |
| PUT | `/api/profissionais/{id}` | Atualizar profissional (admin) |
| DELETE | `/api/profissionais/{id}` | Desativar profissional |
| GET | `/api/marcacoes` | Listar todas as marcações |
| POST | `/api/marcacoes` | Criar marcação (cliente) |
| GET | `/api/marcacoes/disponibilidade?data=&profissionalId=` | Ver horários disponíveis |
| PUT | `/api/marcacoes/{id}/estado` | Alterar estado da marcação (admin) |
| GET | `/api/dashboard` | Estatísticas gerais (admin) |
| GET | `/api/galeria` | Listar imagens da galeria |
| POST | `/api/galeria` | Adicionar imagem (admin) |
| DELETE | `/api/galeria/{id}` | Remover imagem (admin) |

---

## ✨ Funcionalidades Implementadas

- Catálogo de serviços com filtros, preços em **€** e duração
- Loja de produtos com carrinho de compras persistido
- Marcação online passo a passo (serviço → profissional → data/horário → dados)
- Validação de data/hora (impede agendamento no passado)
- Galeria de trabalhos com lightbox
- Área administrativa protegida por login (JWT)
- Dashboard com gráficos e estatísticas
- Gestão de marcações (confirmar/cancelar/reverter)
- CRUD de serviços, produtos, profissionais e galeria (com upload de imagens)
- Notificações em tempo real para administradores (badge + toast)
- Soft delete para serviços, produtos e profissionais
- Envio de e‑mail de confirmação (mock)
- Responsividade mobile‑first (Tailwind CSS)
- Tratamento global de exceções e logging com Serilog

---

## 📝 Observações Finais

- As mensagens e validações da interface estão em **português de Portugal**.
- Datas no formato **DD/MM/AAAA**.
- Valores monetários com **vírgula decimal** (ex.: 12,50 €).
- As tabelas da base de dados são criadas automaticamente na primeira execução:
  - `dotnet ef database update`

Para testar a API autenticada no Swagger:
1. faça `POST /api/auth/login`
2. copie o token
3. cole em **Authorize** no Swagger (formato `Bearer <token>`)

---

*Desenvolvido com dedicação por Dalton Martins 💈*

