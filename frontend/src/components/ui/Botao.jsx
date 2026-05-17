export default function Botao({ children, variante = "primario", ...props }) {
  const base = "px-4 py-2 rounded-md font-medium transition";
  const variantes = {
    primario: "bg-primary text-white hover:bg-yellow-700",
    secundario: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    perigo: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button
      className={`${base} ${variantes[variante] || variantes.primario}`}
      {...props}
    >
      {children}
    </button>
  );
}
