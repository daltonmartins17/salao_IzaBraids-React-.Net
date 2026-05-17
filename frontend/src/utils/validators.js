import { z } from "zod";

export const esquemaMarcacao = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(9, "Telefone obrigatório"),
  servicoId: z.number().min(1, "Selecione um serviço"),
  profissionalId: z.number().min(1, "Selecione um profissional"),
  dataHora: z.date({ required_error: "Data/hora obrigatória" }),
  observacoes: z.string().optional(),
});

export const esquemaLogin = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const esquemaServico = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().min(0.01, "Preço deve ser positivo"),
  duracaoMinutos: z.number().min(1, "Duração mínima 1 minuto"),
  categoria: z.string().optional(),
});

export const esquemaProduto = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  descricao: z.string().optional(),
  preco: z.number().min(0.01, "Preço positivo"),
  stock: z.number().min(0, "Stock não negativo"),
  categoria: z.string().optional(),
});

export const esquemaProfissional = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  especialidade: z.string().optional(),
  biografia: z.string().optional(),
});
