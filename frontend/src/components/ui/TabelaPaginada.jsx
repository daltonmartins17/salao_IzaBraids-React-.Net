import { useState } from "react";

export default function TabelaPaginada({
  colunas,
  dados,
  itensPorPagina = 10,
}) {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(dados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const dadosPaginados = dados.slice(inicio, fim);

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {colunas.map((col, i) => (
              <th key={i} className="p-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dadosPaginados.map((linha, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              {/* Renderizar células de acordo com colunas, espera-se que linha seja objeto */}
              {Object.values(linha).map((cel, j) => (
                <td key={j} className="p-2">
                  {cel}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {totalPaginas > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
            disabled={paginaAtual === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}
