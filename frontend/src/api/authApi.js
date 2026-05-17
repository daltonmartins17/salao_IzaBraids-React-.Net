import axios from "./axios";

export const login = async (email, password) => {
  const { data } = await axios.post("/auth/login", { email, password });
  return data;
};

export const register = async (nome, email, password) => {
  const { data } = await axios.post("/auth/registar", {
    nome,
    email,
    password,
  });
  return data;
};
