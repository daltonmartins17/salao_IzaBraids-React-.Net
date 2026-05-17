import axios from "./axios";

export const getProdutos = async () => {
  const { data } = await axios.get("/produtos");
  return data;
};

export const createProduto = async (formData) => {
  const { data } = await axios.post("/produtos", formData);
  return data;
};

export const updateProduto = async (id, formData) => {
  await axios.put(`/produtos/${id}`, formData);
};

export const deleteProduto = async (id) => {
  await axios.delete(`/produtos/${id}`);
};
