import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useServicos } from "../../hooks/useServicos";
import CardServico from "../../components/ui/CardServico";
import Spinner from "../../components/ui/Spinner";

export default function Home() {
  const { data: servicos, isLoading } = useServicos();

  return (
    <>
      <Helmet>
        <title>IzaBraids - Salão de Beleza em Lisboa</title>
        <meta
          name="description"
          content="Tranças, penteados e cuidados de beleza. Marque já a sua consulta no IzaBraids."
        />
      </Helmet>

      {/* Banner */}
      <section
        className="bg-cover bg-center h-96 flex items-center justify-center"
        style={{ backgroundImage: "url(/banner.jpg)", backgroundSize: "cover" }}
      >
        <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded">
          <h1 className="text-5xl font-bold mb-4">IzaBraids</h1>
          <p className="text-xl mb-6">Arte e dedicação em cada trança</p>
          <Link
            to="/marcacao"
            className="bg-primary hover:bg-yellow-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition"
          >
            Marcar Agora
          </Link>
        </div>
      </section>

      {/* Serviços em Destaque */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Os Nossos Serviços
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicos?.slice(0, 3).map((servico) => (
              <CardServico key={servico.id} servico={servico} />
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link to="/servicos" className="text-primary underline">
            Ver todos os serviços
          </Link>
        </div>
      </section>

      {/* Testemunhos fictícios */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            O que dizem as nossas clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                nome: "Ana Sousa",
                texto: "Adorei as tranças! Profissionalismo e simpatia.",
              },
              {
                nome: "Carla Mendes",
                texto: "O melhor salão para penteados de noiva.",
              },
              {
                nome: "Marta Ribeiro",
                texto: "Ambiente acolhedor e resultados fantásticos.",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white p-6 rounded shadow">
                <p className="italic">"{t.texto}"</p>
                <p className="font-semibold mt-2">— {t.nome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="my-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Pronta para uma transformação?
        </h2>
        <Link
          to="/marcacao"
          className="bg-primary text-white px-6 py-3 rounded-full text-lg"
        >
          Marcar Consulta
        </Link>
      </section>
    </>
  );
}
