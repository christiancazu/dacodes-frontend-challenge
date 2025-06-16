import type { UserRepository } from "@dacodes/lib";

import httpClient from "@dacodes/root/httpClient";

export const usersService: UserRepository = {
  async getAll(dto) {
    return httpClient
      .get(`/users/search?q=${dto.q}&limit=15&skip=${dto.pageParam * 15}`)
      .then((response) => response.data);
  },
};
