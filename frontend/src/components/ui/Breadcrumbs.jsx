import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm mb-4 text-gray-600">
      <Link to="/" className="hover:text-primary">
        Início
      </Link>
      {paths.map((path, index) => {
        const url = `/${paths.slice(0, index + 1).join("/")}`;
        const nome = path.charAt(0).toUpperCase() + path.slice(1);
        return (
          <span key={url}>
            <span className="mx-2">/</span>
            <Link to={url} className="hover:text-primary capitalize">
              {nome}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
