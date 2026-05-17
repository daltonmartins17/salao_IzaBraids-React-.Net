import { useQuery } from "@tanstack/react-query";
import { getServicos } from "../api/servicosApi";

export function useServicos() {
  return useQuery({
    queryKey: ["servicos"],
    queryFn: getServicos,
  });
}
