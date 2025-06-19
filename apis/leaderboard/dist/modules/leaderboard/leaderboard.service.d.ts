import { UserLeaderboard, UserScore } from "@dacodes/lib";
import { Cache } from "cache-manager";
import { WebsocketGateway } from "../websocket/websocket.gateway";
import { RegisterScoreDto } from "./dto/register.dto";
export declare class LeaderboardService {
    private readonly cacheManager;
    private readonly webSocketGateway;
    constructor(cacheManager: Cache, webSocketGateway: WebsocketGateway);
    getTop10Leaderboard(): Promise<UserScore[]>;
    registerNewScore(user: UserLeaderboard, dto: RegisterScoreDto): Promise<void>;
}
