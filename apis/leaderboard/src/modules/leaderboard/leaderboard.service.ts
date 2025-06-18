import { UserLeaderboard, UserScore } from "@dacodes/lib";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { Cache } from "cache-manager";
import { WebsocketGateway } from "../websocket/websocket.gateway";
import { RegisterScoreDto } from "./dto/register.dto";

const CACHE_KEY = "leaderboard";

@Injectable()
export class LeaderboardService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,

    private readonly webSocketGateway: WebsocketGateway
  ) {}

  async getTop10Leaderboard() {
    const leaderboardUsers =
      (await this.cacheManager.get<UserScore[]>(CACHE_KEY)) || [];
    return leaderboardUsers.sort((a, b) => a.time - b.time).slice(0, 10);
  }

  async registerNewScore(user: UserLeaderboard, dto: RegisterScoreDto) {
    const leaderboardUsers =
      (await this.cacheManager.get<UserScore[]>(CACHE_KEY)) || [];

    let userLeaderboard = leaderboardUsers?.find((u) => u.user.id === user.id);

    console.warn(userLeaderboard, dto);
    if (userLeaderboard) {
      if (dto.time < userLeaderboard.time) {
        userLeaderboard.time = dto.time;
      }
    } else {
      userLeaderboard = {
        user,
        time: dto.time,
      };

      leaderboardUsers?.push(userLeaderboard);
    }
    try {
      await this.cacheManager.set(CACHE_KEY, leaderboardUsers, 0);

      const top10 = await this.getTop10Leaderboard();

      this.webSocketGateway.emitUpdate(top10);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }
}
