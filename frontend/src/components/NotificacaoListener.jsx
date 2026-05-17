import { useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePendentes } from "../context/PendentesContext";
import { getDashboard } from "../api/dashboardApi";
import toast from "react-hot-toast";

export default function NotificacaoListener() {
  const { user } = useAuth();
  const { setPendentes } = usePendentes();
  const isAdmin = user && user.role === "Admin";
  const ultimoTotal = useRef(null);

  useEffect(() => {
    if (!isAdmin) return;

    const verificar = async () => {
      try {
        const dados = await getDashboard();
        const totalAtual = dados?.totalMarcacoes ?? 0;

        // Atualiza o badge de pendentes
        setPendentes(dados?.totalPendentes ?? 0);

        // Notificação toast (apenas quando surgem novas)
        if (ultimoTotal.current !== null && totalAtual > ultimoTotal.current) {
          const novas = totalAtual - ultimoTotal.current;
          toast.success(`🔔 ${novas} nova${novas > 1 ? "s" : ""} marcação!`, {
            duration: 4000,
            position: "top-right",
          });
        }
        ultimoTotal.current = totalAtual;
      } catch (error) {
        // ignora falhas de rede
      }
    };

    verificar();
    const intervalo = setInterval(verificar, 30000);
    return () => clearInterval(intervalo);
  }, [isAdmin, setPendentes]);

  return null;
}
