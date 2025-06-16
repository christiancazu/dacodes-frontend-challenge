import { type AuthDto, queryKeys } from "@dacodes/lib";
import queryClient from "@dacodes/root/queryClient";
import useNotify from "@dacodes/root/useNotify";
import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../repository/auth.repository";

export function useAuth() {
  const notify = useNotify();

  const authLogin = () =>
    useMutation({
      mutationKey: ["auth"],
      mutationFn: (dto: AuthDto) => authRepository.login(dto),
      onError: () => {
        notify({
          type: "error",
          message: "El usuario o la contraseña son incorrectos",
        });
      },
      onSuccess: (res) => {
        notify({
          message: "La sesión se ha iniciado correctamente",
        });
        queryClient.setQueryData([queryKeys.auth], res);
      },
    });

  return {
    authLogin,
  };
}
