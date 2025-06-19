import { UserLeaderboard } from "@dacodes/lib";
import { RegisterScoreDto } from "./dto/register.dto";
import { LeaderboardService } from "./leaderboard.service";
export declare class LeaderboardController {
    private readonly leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    registerNewScore(user: UserLeaderboard, dto: RegisterScoreDto): Promise<void>;
    getTop10Leaderboard(): Promise<import("@dacodes/lib").UserScore[]>;
}
