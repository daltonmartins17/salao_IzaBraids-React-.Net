import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-primary mb-2">IzaBraids</h3>
          <p>Transformando cabelos com arte e dedicação desde 2015.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Links Rápidos</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/servicos">Serviços</Link>
            </li>
            <li>
              <Link to="/produtos">Produtos</Link>
            </li>
            <li>
              <Link to="/marcacao">Marcação</Link>
            </li>
            <li>
              <Link to="/contactos">Contactos</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contactos</h4>
          <p>Rua das Tranças, 123, Lisboa</p>
          <p>Tel: 210 123 456</p>
          <p>Email: geral@izabraids.pt</p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>
          &copy; {new Date().getFullYear()} IzaBraids. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
