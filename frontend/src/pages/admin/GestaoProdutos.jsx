import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
} from "../../api/produtosApi";
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaProduto } from "../../utils/validators";

export default function GestaoProdutos() {
  const queryClient = useQueryClient();
  const { data: produtos } = useQuery({
    queryKey: ["produtos"],
    queryFn: getProdutos,
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
    resolver: zodResolver(esquemaProduto),
  });

  const criar = useMutation({
    mutationFn: (formData) => createProduto(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
      toast.success("Produto criado");
      fecharModal();
    },
  });

  const editar = useMutation({
    mutationFn: ({ id, formData }) => updateProduto(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
      toast.success("Produto atualizado");
      fecharModal();
    },
  });

  const excluir = useMutation({
    mutationFn: (id) => deleteProduto(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["produtos"]);
      toast.success("Produto removido");
    },
  });

  const abrirModal = (produto = null) => {
    setEditando(produto);
    if (produto) {
      reset(produto);
    } else {
      reset({ nome: "", descricao: "", preco: 0, stock: 0, categoria: "" });
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
     if (key === "preco" && val !== undefined) {
       formData.append(key, String(val).replace(".", ","));
     } else {
       formData.append(key, val);
     }
   });
   if (imagem) formData.append("imagem", imagem);

   if (editando) {
     editar.mutate({ id: editando.id, formData });
   } else {
     criar.mutate(formData);
   }
 };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Botao onClick={() => abrirModal()}>Novo Produto</Botao>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produtos?.map((p) => (
          <div key={p.id} className="border rounded p-4 shadow">
            <img
              src={p.imagemUrl || "/placeholder.png"}
              alt={p.nome}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-bold">{p.nome}</h3>
            <p>
              {p.preco?.toFixed(2).replace(".", ",")} € - Stock: {p.stock}
            </p>
            <div className="flex gap-2 mt-2">
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
        titulo={editando ? "Editar Produto" : "Novo Produto"}
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
            label="Stock"
            type="number"
            {...register("stock", { valueAsNumber: true })}
            error={errors.stock?.message}
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
