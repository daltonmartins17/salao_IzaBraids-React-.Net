import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaMarcacao } from "../../utils/validators";
import { useServicos } from "../../hooks/useServicos";
import { getProfissionais } from "../../api/profissionaisApi";
import { getDisponibilidade, createMarcacao } from "../../api/marcacoesApi";
import { useQuery } from "@tanstack/react-query";
import Calendario from "../../components/ui/Calendario";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";

export default function Marcacao() {
  const [passo, setPasso] = useState(1);
  const { data: servicos } = useServicos();
  const { data: profissionais } = useQuery({
    queryKey: ["profissionais"],
    queryFn: getProfissionais,
  });
  const [horarios, setHorarios] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [profissionalId, setProfissionalId] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaMarcacao),
    defaultValues: {
      servicoId: "",
      profissionalId: "",
      nome: "",
      email: "",
      telefone: "",
      observacoes: "",
    },
  });

  const servicoSelecionado = watch("servicoId");

  // Carregar horários apenas se data e profissional estiverem definidos
  useEffect(() => {
    if (selectedDate && profissionalId) {
      const dataFormatada = selectedDate.toISOString().split("T")[0]; // "yyyy-MM-dd"
      getDisponibilidade(dataFormatada, profissionalId)
        .then((horariosApi) => {
          const agora = new Date();
          const hoje = selectedDate.toDateString() === agora.toDateString();

          const horariosFiltrados = hoje
            ? horariosApi.filter((h) => {
                const horario = new Date(h);
                // só mostra horários 5 minutos à frente
                const limite = new Date(agora.getTime() + 5 * 60 * 1000);
                return horario > limite;
              })
            : horariosApi;

          setHorarios(horariosFiltrados);
        })
        .catch(() => toast.error("Erro ao carregar horários"));
    }
  }, [selectedDate, profissionalId]);

  const onSubmit = async (data) => {
    try {
      await createMarcacao(data);
      toast.success("Marcação realizada com sucesso! Verifique o seu email.");
      setPasso(5);
    } catch (err) {
      toast.error(err.response?.data?.mensagem || "Erro ao marcar");
    }
  };

  return (
    <>
      <Helmet>
        <title>Marcação - IzaBraids</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Marcação Online</h1>

      <div className="flex mb-8">
        {["Serviço", "Profissional", "Data/Hora", "Dados", "Confirmação"].map(
          (label, i) => (
            <div
              key={i}
              className={`flex-1 text-center py-2 ${passo > i ? "bg-primary text-white" : "bg-gray-200"}`}
            >
              {i + 1}. {label}
            </div>
          ),
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        {passo === 1 && (
          <div>
            <label className="block mb-2 font-medium">Escolha o serviço</label>
            <Controller
              name="servicoId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border rounded p-2"
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                    setPasso(2);
                  }}
                >
                  <option value="">Selecione...</option>
                  {servicos?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome} - {s.preco.toFixed(2).replace(".", ",")} € (
                      {s.duracaoMinutos} min)
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.servicoId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.servicoId.message}
              </p>
            )}
          </div>
        )}

        {passo === 2 && (
          <div>
            <label className="block mb-2 font-medium">
              Escolha o profissional
            </label>
            <Controller
              name="profissionalId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border rounded p-2"
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    field.onChange(id);
                    setProfissionalId(id);
                  }}
                >
                  <option value="">Selecione...</option>
                  {profissionais?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome} ({p.especialidade})
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.profissionalId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profissionalId.message}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <Botao variante="secundario" onClick={() => setPasso(1)}>
                Voltar
              </Botao>
              <Botao
                onClick={() => {
                  if (!profissionalId) {
                    toast.error("Selecione um profissional.");
                    return;
                  }
                  setPasso(3);
                }}
              >
                Continuar
              </Botao>
            </div>
          </div>
        )}

        {passo === 3 && (
          <div>
            <label className="block mb-2 font-medium">Selecione a data</label>
            <Calendario
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setValue("dataHora", date);
              }}
              minDate={new Date(new Date().setHours(0, 0, 0, 0))} // hoje já é permitido
              filterDate={(date) =>
                date >= new Date(new Date().setHours(0, 0, 0, 0))
              }
            />

            {selectedDate && (
              <div className="mt-4">
                <label className="block mb-2 font-medium">
                  Horários disponíveis
                </label>
                {horarios.length === 0 ? (
                  <p className="text-gray-500">
                    Não há horários disponíveis para esta data.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {horarios.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => {
                          setValue("dataHora", new Date(h));
                          setPasso(4);
                        }}
                        className="p-2 border rounded hover:bg-primary hover:text-white"
                      >
                        {new Date(h).toLocaleTimeString("pt-PT", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <Botao variante="secundario" onClick={() => setPasso(2)}>
                Voltar
              </Botao>
            </div>
          </div>
        )}

        {passo === 4 && (
          <div>
            <Input
              label="Nome"
              {...control.register("nome")}
              error={errors.nome?.message}
            />
            <Input
              label="Email"
              type="email"
              {...control.register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Telefone"
              {...control.register("telefone")}
              error={errors.telefone?.message}
            />
            <label className="block mb-2">Observações (opcional)</label>
            <textarea
              {...control.register("observacoes")}
              className="w-full border rounded p-2"
              rows={3}
            ></textarea>
            <div className="mt-4 flex gap-2">
              <Botao variante="secundario" onClick={() => setPasso(3)}>
                Voltar
              </Botao>
              <Botao type="submit">Confirmar Marcação</Botao>
            </div>
          </div>
        )}

        {passo === 5 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">Obrigado!</h2>
            <p className="mt-2">
              A sua marcação foi registada. Receberá um email de confirmação.
            </p>
          </div>
        )}
      </form>
    </>
  );
}
