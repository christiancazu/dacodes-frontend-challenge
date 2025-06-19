import { message } from "antd";
import axios from "axios";
import debounce from "debounce";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_DUMMY_URL,
});

const messageError = debounce((msg) => message.error(msg, 5), 500);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorMessage = error?.response?.data?.message;

    if (error?.code === "ERR_NETWORK") {
      messageError("No hay conexión con el servidor");
    }

    if ([401].some((status) => status === error.status)) {
      messageError(
        errorMessage === "Unauthorized"
          ? "La sessión ha finalizado, ingrese nuevamente"
          : errorMessage
      );
    }

    if ([400, 404, 422, 500].some((status) => status === error.status)) {
      messageError(errorMessage || "Error en el servidor");
    }

    return Promise.reject(error);
  }
);

const sessionToken = localStorage.getItem("token") as string;

export const setToken = (token: string, isFirstTime = false) => {
  const tokenInLocalStorage = localStorage.getItem("token");

  if (!tokenInLocalStorage && !isFirstTime) {
    localStorage.setItem("token", token);
  }

  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

setToken(sessionToken, true);

export default httpClient;
