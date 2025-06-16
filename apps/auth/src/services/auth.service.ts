import type { AuthRepository } from "@dacodes/lib";

import httpClient from "@dacodes/root/httpClient";

export const authService: AuthRepository = {
  async login(dto) {
    return httpClient
      .post("/auth/login", dto)
      .then((response) => response.data);
  },
};
