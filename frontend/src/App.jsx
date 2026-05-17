import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/public/Home";
import Servicos from "./pages/public/Servicos";
import Produtos from "./pages/public/Produtos";
import Marcacao from "./pages/public/Marcacao";
import Galeria from "./pages/public/Galeria";
import Contactos from "./pages/public/Contactos";
import NotFound from "./pages/public/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import GestaoMarcacoes from "./pages/admin/GestaoMarcacoes";
import GestaoServicos from "./pages/admin/GestaoServicos";
import GestaoProdutos from "./pages/admin/GestaoProdutos";
import GestaoProfissionais from "./pages/admin/GestaoProfissionais";
import GestaoGaleria from "./pages/admin/GestaoGaleria";
import ProtectedRoute from "./components/ui/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/marcacao" element={<Marcacao />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="marcacoes" element={<GestaoMarcacoes />} />
          <Route path="servicos" element={<GestaoServicos />} />
          <Route path="produtos" element={<GestaoProdutos />} />
          <Route path="profissionais" element={<GestaoProfissionais />} />
          <Route path="galeria" element={<GestaoGaleria />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
