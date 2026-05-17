import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServicos,
  createServico,
  updateServico,
  deleteServico,
} from "../../api/servicosApi";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaServico } from "../../utils/validators";

export default function GestaoServicos() {
  const queryClient = useQueryClient();
  const { data: servicos } = useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [imagem, setImagem] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaServico),
  });

  const criarServico = useMutation({
    mutationFn: (formData) => createServico(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["servicos"]);
      toast.success("Serviço criado");
      fecharModal();
    },
  });

  const editarServico = useMutation({
    mutationFn: ({ id, formData }) => updateServico(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["servicos"]);
      toast.success("Serviço atualizado");
      fecharModal();
    },
  });

  const excluirServico = useMutation({
    mutationFn: (id) => deleteServico(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["servicos"]);
      toast.success("Serviço removido");
    },
  });

  const abrirModal = (servico = null) => {
    setEditando(servico);
    if (servico) {
      reset(servico);
    } else {
      reset({
        nome: "",
        descricao: "",
        preco: 0,
        duracaoMinutos: 30,
        categoria: "",
      });
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setImagem(null);
  };

 const onSubmit = (data) => {
   const formData = new FormData();
   Object.entries(data).forEach(([key, val]) => {
     // Preco deve usar vírgula decimal
     if (key === "preco" && val !== undefined) {
       formData.append(key, String(val).replace(".", ","));
     } else {
       formData.append(key, val);
     }
   });
   if (imagem) formData.append("imagem", imagem);

   if (editando) {
     editarServico.mutate({ id: editando.id, formData });
   } else {
     criarServico.mutate(formData);
   }
 };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Serviços</h1>
        <Botao onClick={() => abrirModal()}>Novo Serviço</Botao>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {servicos?.map((s) => (
          <div key={s.id} className="border rounded p-4 shadow">
            <img
              src={s.imagemUrl || "/placeholder.png"}
              alt={s.nome}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold">{s.nome}</h3>
            <p>
              {s.preco?.toFixed(2).replace(".", ",")} € - {s.duracaoMinutos} min
            </p>
            <div className="flex gap-2 mt-2">
              <Botao variante="secundario" onClick={() => abrirModal(s)}>
                Editar
              </Botao>
              <Botao
                variante="perigo"
                onClick={() => excluirServico.mutate(s.id)}
              >
                Remover
              </Botao>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalAberto}
        onClose={fecharModal}
        titulo={editando ? "Editar Serviço" : "Novo Serviço"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            {...register("nome")}
            error={errors.nome?.message}
          />
          <Input label="Descrição" {...register("descricao")} />
          <Input
            label="Preço (€)"
            type="number"
            step="0.01"
            {...register("preco", { valueAsNumber: true })}
            error={errors.preco?.message}
          />
          <Input
            label="Duração (min)"
            type="number"
            {...register("duracaoMinutos", { valueAsNumber: true })}
            error={errors.duracaoMinutos?.message}
          />
          <Input label="Categoria" {...register("categoria")} />
          <input
            type="file"
            onChange={(e) => setImagem(e.target.files[0])}
            className="mb-4"
          />
          <div className="flex gap-2 justify-end">
            <Botao variante="secundario" type="button" onClick={fecharModal}>
              Cancelar
            </Botao>
            <Botao type="submit">Guardar</Botao>
          </div>
        </form>
      </Modal>
    </div>
  );
}
