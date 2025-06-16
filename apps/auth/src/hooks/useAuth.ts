import { type AuthDto, queryKeys } from "@dacodes/lib";
import queryClient from "@dacodes/root/queryClient";
import useNotify from "@dacodes/root/useNotify";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export function useAuth() {
  const notify = useNotify();

  const authLogin = () =>
    useMutation({
      mutationKey: ["login"],
      mutationFn: (dto: AuthDto) => authService.login(dto),
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
