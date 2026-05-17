import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página não encontrada - IzaBraids</title>
      </Helmet>
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl mt-4">Oops! Página não encontrada.</p>
        <p className="mt-2 text-gray-600">
          A página que procura não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-full"
        >
          Voltar à Página Inicial
        </Link>
      </div>
    </>
  );
}
