import type { AuthRepository } from "@dacodes/lib";

import httpClient, { setToken } from "@dacodes/root/httpClient";

export const authService: AuthRepository = {
  async login(dto) {
    return httpClient.post("/auth/login", dto).then((response) => {
      setToken(response.data.accessToken);
      return response.data;
    });
  },
};
