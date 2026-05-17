import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useServicos } from "../../hooks/useServicos";
import CardServico from "../../components/ui/CardServico";
import Spinner from "../../components/ui/Spinner";

export default function Servicos() {
  const { data: servicos, isLoading } = useServicos();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const categorias = [
    ...new Set((servicos || []).map((s) => s.categoria).filter(Boolean)),
  ];

  const filtrados = categoriaSelecionada
    ? servicos.filter((s) => s.categoria === categoriaSelecionada)
    : servicos;

  return (
    <>
      <Helmet>
        <title>Serviços - IzaBraids</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Os Nossos Serviços</h1>

      {categorias.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => setCategoriaSelecionada("")}
            className={`px-3 py-1 rounded ${!categoriaSelecionada ? "bg-primary text-white" : "bg-gray-200"}`}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-3 py-1 rounded ${categoriaSelecionada === cat ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtrados?.map((servico) => (
            <CardServico key={servico.id} servico={servico} />
          ))}
        </div>
      )}
    </>
  );
}
