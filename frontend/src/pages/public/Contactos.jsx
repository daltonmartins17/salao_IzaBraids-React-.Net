import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";

export default function Contactos() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock de envio
    toast.success("Mensagem enviada! Entraremos em contacto.");
    setNome("");
    setEmail("");
    setMensagem("");
  };

  return (
    <>
      <Helmet>
        <title>Contactos - IzaBraids</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Contactos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Fale Connosco</h2>
          <p className="mb-2">
            <strong>Morada:</strong> Rua das Tranças, 123, Lisboa
          </p>
          <p className="mb-2">
            <strong>Telefone:</strong> 210 123 456
          </p>
          <p className="mb-4">
            <strong>Email:</strong> geral@izabraids.pt
          </p>
          <h3 className="font-semibold mb-2">Horário de Funcionamento</h3>
          <p>Seg - Sex: 09:00 - 19:00</p>
          <p>Sáb: 09:00 - 14:00</p>
          <p>Dom: Fechado</p>

          {/* Mapa estático (exemplo com iframe do Google Maps) */}
          <iframe
            title="Localização"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.5... (substitua pela chave real)"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="mt-6"
          ></iframe>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit}>
            <Input
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="block mb-2 font-medium">Mensagem</label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className="w-full border rounded p-2 mb-4"
              rows={5}
              required
            ></textarea>
            <Botao type="submit">Enviar</Botao>
          </form>
        </div>
      </div>
    </>
  );
}
