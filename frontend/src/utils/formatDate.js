export const formatarData = (dataISO) => {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatarHora = (dataISO) => {
  if (!dataISO) return "";
  const data = new Date(dataISO);
  return data.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatarPreco = (valor) => {
  if (valor === null || valor === undefined) return "";
  return Number(valor).toFixed(2).replace(".", ",") + " €";
};
