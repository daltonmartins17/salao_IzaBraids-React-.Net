import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/dashboardApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Spinner from "../../components/ui/Spinner";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) return <Spinner />;

  const chartData = [
    { name: "Total Marcações", valor: data?.totalMarcacoes || 0 },
    { name: "Clientes", valor: data?.totalClientes || 0 },
    { name: "Receita (€)", valor: data?.receitaTotal || 0 },
  ];

  return (
    <>
      <Helmet>
        <title>Painel - IzaBraids</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

      {/* Cartões de acesso rápido */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link
          to="/admin/marcacoes"
          className="bg-primary text-white p-4 rounded hover:bg-yellow-700 transition text-center"
        >
          <span className="text-lg font-semibold">Gerir Marcações</span>
        </Link>
        <Link
          to="/admin/servicos"
          className="bg-primary text-white p-4 rounded hover:bg-yellow-700 transition text-center"
        >
          <span className="text-lg font-semibold">Gerir Serviços</span>
        </Link>
        <Link
          to="/admin/produtos"
          className="bg-primary text-white p-4 rounded hover:bg-yellow-700 transition text-center"
        >
          <span className="text-lg font-semibold">Gerir Produtos</span>
        </Link>
        <Link
          to="/admin/profissionais"
          className="bg-primary text-white p-4 rounded hover:bg-yellow-700 transition text-center"
        >
          <span className="text-lg font-semibold">Gerir Profissionais</span>
        </Link>
        <Link
          to="/admin/galeria"
          className="bg-primary text-white p-4 rounded hover:bg-yellow-700 transition text-center"
        >
          <span className="text-lg font-semibold">Gerir Galeria</span>
        </Link>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Total Marcações</h3>
          <p className="text-3xl font-bold text-primary">
            {data?.totalMarcacoes}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Clientes</h3>
          <p className="text-3xl font-bold text-primary">
            {data?.totalClientes}
          </p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Receita Total</h3>
          <p className="text-3xl font-bold text-primary">
            {data?.receitaTotal.toFixed(2).replace(".", ",")} €
          </p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Resumo</h2>
        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#B8860B" />
        </BarChart>
      </div>

      {/* Próximas Marcações */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Próximas Marcações</h2>
        <ul className="space-y-2">
          {data?.proximasMarcacoes?.map((m) => (
            <li key={m.id} className="flex justify-between border-b py-2">
              <span>{m.cliente}</span>
              <span>{m.servico}</span>
              <span>{new Date(m.dataHora).toLocaleString("pt-PT")}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
