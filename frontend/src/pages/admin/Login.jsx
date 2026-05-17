import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaLogin } from "../../utils/validators";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Botao from "../../components/ui/Botao";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaLogin),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login efetuado com sucesso");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.mensagem || "Credenciais inválidas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Entrar no Painel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          label="Palavra-passe"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Botao type="submit" className="w-full">
          Entrar
        </Botao>
      </form>
    </div>
  );
}
