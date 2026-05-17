import axios from "./axios";

export const getMarcacoes = async () => {
  const { data } = await axios.get("/marcacoes");
  return data;
};

export const createMarcacao = async (dados) => {
  const { data } = await axios.post("/marcacoes", dados);
  return data;
};

export const getDisponibilidade = async (data, profissionalId) => {
  const { data: horarios } = await axios.get("/marcacoes/disponibilidade", {
    params: { data, profissionalId },
  });
  return horarios;
};

export const updateEstado = async (id, estado) => {
  await axios.put(`/marcacoes/${id}/estado`, JSON.stringify(estado), {
    headers: { "Content-Type": "application/json" },
  });
};
