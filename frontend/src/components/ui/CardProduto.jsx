import { useCart } from "../../hooks/useCart";

export default function CardProduto({ produto }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <img
        src={produto.imagemUrl || "/placeholder.png"}
        alt={produto.nome}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{produto.nome}</h3>
        <p className="text-gray-600">{produto.descricao}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">
            {produto.preco.toFixed(2).replace(".", ",")} €
          </span>
          <span className="text-sm">
            {produto.stock > 0 ? `Stock: ${produto.stock}` : "Esgotado"}
          </span>
        </div>
        <button
          onClick={() => addToCart(produto)}
          disabled={produto.stock <= 0}
          className="mt-3 w-full bg-primary text-white py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
