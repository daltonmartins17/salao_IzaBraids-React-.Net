export default function CardProfissional({ profissional }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition text-center">
      <img
        src={profissional.fotoUrl || "/avatar.png"}
        alt={profissional.nome}
        className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{profissional.nome}</h3>
        <p className="text-gray-600">{profissional.especialidade}</p>
        <p className="text-sm mt-2">{profissional.biografia}</p>
      </div>
    </div>
  );
}
