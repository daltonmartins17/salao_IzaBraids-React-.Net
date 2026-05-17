import axios from "./axios";

export const getServicos = async () => {
  const { data } = await axios.get("/servicos");
  return data;
};

export const createServico = async (formData) => {
  const { data } = await axios.post("/servicos", formData);
  return data;
};

export const updateServico = async (id, formData) => {
  await axios.put(`/servicos/${id}`, formData);
};

export const deleteServico = async (id) => {
  await axios.delete(`/servicos/${id}`);
};
