import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getGaleria, createGaleria, deleteGaleria } from "../../api/galeriaApi";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export default function GestaoGaleria() {
  const queryClient = useQueryClient();
  const { data: imagens } = useQuery({
    queryKey: ["galeria"],
    queryFn: getGaleria,
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [arquivo, setArquivo] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { titulo: "", descricao: "", categoria: "" },
  });

  const criar = useMutation({
    mutationFn: (formData) => createGaleria(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["galeria"]);
      toast.success("Imagem adicionada");
      fecharModal();
    },
  });

  const excluir = useMutation({
    mutationFn: (id) => deleteGaleria(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["galeria"]);
      toast.success("Imagem removida");
    },
  });

  const fecharModal = () => {
    setModalAberto(false);
    setArquivo(null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("titulo", data.titulo);
    formData.append("descricao", data.descricao || "");
    formData.append("categoria", data.categoria || "");
    if (arquivo) formData.append("imagem", arquivo);
    criar.mutate(formData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Galeria</h1>
        <Botao onClick={() => setModalAberto(true)}>Adicionar Imagem</Botao>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {imagens?.map((img) => (
          <div key={img.id} className="border rounded p-2">
            <img
              src={img.imagemUrl}
              alt={img.titulo}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm mt-1">{img.titulo}</p>
            <Botao
              variante="perigo"
              className="text-xs mt-1"
              onClick={() => excluir.mutate(img.id)}
            >
              Eliminar
            </Botao>
          </div>
        ))}
      </div>

      <Modal isOpen={modalAberto} onClose={fecharModal} titulo="Nova Imagem">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Título"
            {...register("titulo", { required: "Título obrigatório" })}
            error={errors.titulo?.message}
          />
          <Input label="Descrição" {...register("descricao")} />
          <Input label="Categoria" {...register("categoria")} />
          <input
            type="file"
            required
            onChange={(e) => setArquivo(e.target.files[0])}
            className="mb-4"
          />
          <div className="flex gap-2 justify-end">
            <Botao variante="secundario" onClick={fecharModal}>
              Cancelar
            </Botao>
            <Botao type="submit">Adicionar</Botao>
          </div>
        </form>
      </Modal>
    </div>
  );
}
