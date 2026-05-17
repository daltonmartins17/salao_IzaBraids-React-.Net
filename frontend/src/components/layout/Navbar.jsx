import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePendentes } from "../../context/PendentesContext"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pendentes } = usePendentes(); // ✅ obtém o número de pendentes
  const isAdmin = user && user.role === "Admin";

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-primary">
          IzaBraids
        </Link>
        <div className="flex gap-4 items-center">
          {isAdmin ? (
            // Links de administração
            <>
              <Link to="/admin">Painel</Link>

              {/* Link com badge de pendentes */}
              <Link to="/admin/marcacoes" className="relative">
                Marcações
                {pendentes > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {pendentes}
                  </span>
                )}
              </Link>

              <Link to="/admin/servicos">Serviços</Link>
              <Link to="/admin/produtos">Produtos</Link>
              <Link to="/admin/profissionais">Profissionais</Link>
              <Link to="/admin/galeria">Galeria</Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-700 ml-4"
              >
                Sair
              </button>
            </>
          ) : (
            // Links públicos
            <>
              <Link to="/servicos">Serviços</Link>
              <Link to="/produtos">Produtos</Link>
              <Link to="/marcacao">Marcação</Link>
              <Link to="/galeria">Galeria</Link>
              <Link to="/contactos">Contactos</Link>
              {!user && <Link to="/login">Entrar</Link>}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
