import type { LeaderBoardRepository } from "@dacodes/lib";
import httpClient from "@dacodes/root/httpClient";

const api = `${import.meta.env.VITE_API_LEADERBOARD_URL}/leaderboard`;

export const leaderboardService: LeaderBoardRepository = {
  getTop10Leaderboard: async () => {
    return httpClient.get(api).then((res) => res.data);
  },

  registerNewScore: async (dto) => {
    return httpClient.post(api, dto).then((res) => res.data);
  },
};
