import { createContext, useState, useContext } from "react";

export const PendentesContext = createContext();

export function PendentesProvider({ children }) {
  const [pendentes, setPendentes] = useState(0);

  return (
    <PendentesContext.Provider value={{ pendentes, setPendentes }}>
      {children}
    </PendentesContext.Provider>
  );
}

export const usePendentes = () => useContext(PendentesContext);
