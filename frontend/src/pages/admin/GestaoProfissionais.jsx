import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfissionais,
  createProfissional,
  updateProfissional,
  deleteProfissional,
} from "../../api/profissionaisApi";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaProfissional } from "../../utils/validators";

export default function GestaoProfissionais() {
  const queryClient = useQueryClient();
  const { data: profissionais } = useQuery({
    queryKey: ["profissionais"],
    queryFn: getProfissionais,
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [foto, setFoto] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaProfissional),
  });

  const criar = useMutation({
    mutationFn: (formData) => createProfissional(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["profissionais"]);
      toast.success("Profissional criado");
      fecharModal();
    },
  });

  const editar = useMutation({
    mutationFn: ({ id, formData }) => updateProfissional(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["profissionais"]);
      toast.success("Atualizado");
      fecharModal();
    },
  });

  const excluir = useMutation({
    mutationFn: (id) => deleteProfissional(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["profissionais"]);
      toast.success("Removido");
    },
  });

  const abrirModal = (profissional = null) => {
    setEditando(profissional);
    if (profissional) {
      reset(profissional);
    } else {
      reset({ nome: "", especialidade: "", biografia: "" });
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFoto(null);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => formData.append(key, val));
    if (foto) formData.append("foto", foto);

    if (editando) {
      editar.mutate({ id: editando.id, formData });
    } else {
      criar.mutate(formData);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profissionais</h1>
        <Botao onClick={() => abrirModal()}>Novo Profissional</Botao>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profissionais?.map((p) => (
          <div key={p.id} className="border rounded p-4 shadow text-center">
            <img
              src={p.fotoUrl || "/avatar.png"}
              alt={p.nome}
              className="w-20 h-20 object-cover rounded-full mx-auto"
            />
            <h3 className="font-bold mt-2">{p.nome}</h3>
            <p className="text-sm">{p.especialidade}</p>
            <div className="flex gap-2 justify-center mt-2">
              <Botao variante="secundario" onClick={() => abrirModal(p)}>
                Editar
              </Botao>
              <Botao variante="perigo" onClick={() => excluir.mutate(p.id)}>
                Remover
              </Botao>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalAberto}
        onClose={fecharModal}
        titulo={editando ? "Editar Profissional" : "Novo Profissional"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Nome"
            {...register("nome")}
            error={errors.nome?.message}
          />
          <Input label="Especialidade" {...register("especialidade")} />
          <Input label="Biografia" {...register("biografia")} />
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
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
