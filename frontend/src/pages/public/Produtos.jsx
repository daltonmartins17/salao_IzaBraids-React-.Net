import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getProdutos } from "../../api/produtosApi";
import { useState } from "react";
import CardProduto from "../../components/ui/CardProduto";
import Spinner from "../../components/ui/Spinner";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

export default function Produtos() {
  const { data: produtos, isLoading } = useQuery({
    queryKey: ["produtos"],
    queryFn: getProdutos,
  });
  const [pesquisa, setPesquisa] = useState("");
  const { cart, total } = useCart();

  const filtrados = produtos?.filter((p) =>
    p.nome.toLowerCase().includes(pesquisa.toLowerCase()),
  );

  return (
    <>
      <Helmet>
        <title>Produtos - IzaBraids</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Catálogo de Produtos</h1>

      <input
        type="text"
        placeholder="Pesquisar produtos..."
        className="border rounded p-2 w-full max-w-md mb-6"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtrados?.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      )}

      {/* Carrinho flutuante */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded p-4 w-72">
          <h3 className="font-bold mb-2">Carrinho ({cart.length} itens)</h3>
          <ul className="text-sm mb-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.nome} x{item.quantidade}
                </span>
                <span>
                  {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}{" "}
                  €
                </span>
              </li>
            ))}
          </ul>
          <p className="font-bold text-right">
            Total: {total.toFixed(2).replace(".", ",")} €
          </p>
          <Link
            to="/marcacao"
            className="block mt-2 text-center bg-primary text-white py-2 rounded"
          >
            Finalizar Compra
          </Link>
        </div>
      )}
    </>
  );
}
