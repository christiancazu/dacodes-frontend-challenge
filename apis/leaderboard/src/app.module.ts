import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./modules/auth/auth.guard";
import { AppConfigModule } from "./modules/config/config.module";
import { LeaderboardModule } from "./modules/leaderboard/leaderboard.module";
import { WebsocketModule } from "./modules/websocket/websocket.module";

@Module({
  imports: [AppConfigModule, WebsocketModule, LeaderboardModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
