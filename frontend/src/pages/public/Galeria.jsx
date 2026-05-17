import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { getGaleria } from "../../api/galeriaApi";
import { useState } from "react";
import Spinner from "../../components/ui/Spinner";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Galeria() {
  const { data: imagens, isLoading } = useQuery({
    queryKey: ["galeria"],
    queryFn: getGaleria,
  });
  const [abrir, setAbrir] = useState(false);
  const [indice, setIndice] = useState(0);

  const slides =
    imagens?.map((img) => ({
      src: img.imagemUrl,
      alt: img.titulo,
      title: img.titulo,
    })) || [];

  return (
    <>
      <Helmet>
        <title>Galeria - IzaBraids</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Galeria de Trabalhos</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imagens?.map((img, index) => (
            <div
              key={img.id}
              className="cursor-pointer hover:opacity-80 transition"
              onClick={() => {
                setIndice(index);
                setAbrir(true);
              }}
            >
              <img
                src={img.imagemUrl}
                alt={img.titulo}
                className="w-full h-48 object-cover rounded"
              />
              <p className="text-sm mt-1">{img.titulo}</p>
            </div>
          ))}
        </div>
      )}

      {abrir && (
        <Lightbox
          open={abrir}
          close={() => setAbrir(false)}
          slides={slides}
          index={indice}
        />
      )}
    </>
  );
}
