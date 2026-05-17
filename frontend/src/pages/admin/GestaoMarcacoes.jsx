import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMarcacoes, updateEstado } from "../../api/marcacoesApi";
import TabelaPaginada from "../../components/ui/TabelaPaginada";
import Botao from "../../components/ui/Botao";
import { ESTADOS_MARCACAO } from "../../utils/constants";
import { formatarData, formatarHora } from "../../utils/formatDate";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";

export default function GestaoMarcacoes() {
  const queryClient = useQueryClient();
  const { data: marcacoes, isLoading } = useQuery({
    queryKey: ["marcacoes"],
    queryFn: getMarcacoes,
  });

  const mudancaEstado = useMutation({
    mutationFn: ({ id, estado }) => updateEstado(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries(["marcacoes"]);
      toast.success("Estado atualizado");
    },
  });

  const colunas = [
    "Cliente",
    "Serviço",
    "Profissional",
    "Data",
    "Hora",
    "Estado",
    "Ações",
  ];

  const dados =
    marcacoes?.map((m) => ({
      cliente: m.nomeCliente,
      servico: m.nomeServico,
      profissional: m.nomeProfissional,
      data: formatarData(m.dataHora),
      hora: formatarHora(m.dataHora),
      estado: (
        <span
          className={`px-2 py-1 rounded text-sm ${
            m.estado === "Confirmada"
              ? "bg-green-100 text-green-800"
              : m.estado === "Cancelada"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {m.estado}
        </span>
      ),
      acoes: (
        <div className="flex gap-1 flex-wrap">
          {m.estado === "Pendente" && (
            <>
              <Botao
                variante="primario"
                className="text-xs py-1 px-2"
                onClick={() =>
                  mudancaEstado.mutate({ id: m.id, estado: "Confirmada" })
                }
              >
                Confirmar
              </Botao>
              <Botao
                variante="perigo"
                className="text-xs py-1 px-2"
                onClick={() =>
                  mudancaEstado.mutate({ id: m.id, estado: "Cancelada" })
                }
              >
                Cancelar
              </Botao>
            </>
          )}
          {m.estado === "Confirmada" && (
            <Botao
              variante="perigo"
              className="text-xs py-1 px-2"
              onClick={() =>
                mudancaEstado.mutate({ id: m.id, estado: "Cancelada" })
              }
            >
              Cancelar
            </Botao>
          )}
          {m.estado === "Cancelada" && (
            <Botao
              variante="primario"
              className="text-xs py-1 px-2"
              onClick={() =>
                mudancaEstado.mutate({ id: m.id, estado: "Confirmada" })
              }
            >
              Confirmar
            </Botao>
          )}
        </div>
      ),
    })) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestão de Marcações</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <TabelaPaginada colunas={colunas} dados={dados} />
      )}
    </div>
  );
}
