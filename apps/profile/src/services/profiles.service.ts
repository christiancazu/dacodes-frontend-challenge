import type { ProfileRepository } from "@dacodes/lib";

import httpClient from "@dacodes/root/httpClient";

export const profilesService: ProfileRepository = {
  async getProfileById(id) {
    return httpClient.get(`/users/${id}`).then((response) => response.data);
  },
};
