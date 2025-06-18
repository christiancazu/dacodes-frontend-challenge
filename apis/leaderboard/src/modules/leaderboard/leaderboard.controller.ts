import { UserLeaderboard } from "@dacodes/lib";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { RequestUserParam } from "../user/request-user-param.decorator";
import { RegisterScoreDto } from "./dto/register.dto";
import { LeaderboardService } from "./leaderboard.service";

@Controller("leaderboard")
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Post()
  registerNewScore(
    @RequestUserParam() user: UserLeaderboard,
    @Body() dto: RegisterScoreDto
  ) {
    return this.leaderboardService.registerNewScore(user, dto);
  }

  @Get()
  getTop10Leaderboard() {
    return this.leaderboardService.getTop10Leaderboard();
  }
}
