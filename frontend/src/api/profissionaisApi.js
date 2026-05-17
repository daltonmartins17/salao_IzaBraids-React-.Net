import axios from "./axios";

export const getProfissionais = async () => {
  const { data } = await axios.get("/profissionais");
  return data;
};

export const createProfissional = async (formData) => {
  const { data } = await axios.post("/profissionais", formData);
  return data;
};

export const updateProfissional = async (id, formData) => {
  await axios.put(`/profissionais/${id}`, formData);
};

export const deleteProfissional = async (id) => {
  await axios.delete(`/profissionais/${id}`);
};
