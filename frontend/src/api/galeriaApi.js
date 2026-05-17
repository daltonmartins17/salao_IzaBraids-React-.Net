import axios from "./axios";

export const getGaleria = async () => {
  const { data } = await axios.get("/galeria");
  return data;
};

export const createGaleria = async (formData) => {
  const { data } = await axios.post("/galeria", formData);
  return data;
};

export const deleteGaleria = async (id) => {
  await axios.delete(`/galeria/${id}`);
};
