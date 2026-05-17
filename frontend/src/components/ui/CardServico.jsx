import { Link } from "react-router-dom";
import { formatarPreco } from "../../utils/formatDate"; 

export default function CardServico({ servico }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={servico.imagemUrl || "/placeholder.png"}
        alt={servico.nome}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{servico.nome}</h3>
        <p className="text-gray-600">{servico.descricao}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">
            {servico.preco.toFixed(2).replace(".", ",")} €
          </span>
          <span className="text-sm">{servico.duracaoMinutos} min</span>
        </div>
        <Link
          to={`/marcacao?servico=${servico.id}`}
          className="mt-3 block text-center bg-primary text-white py-2 rounded hover:bg-yellow-700"
        >
          Marcar
        </Link>
      </div>
    </div>
  );
}
