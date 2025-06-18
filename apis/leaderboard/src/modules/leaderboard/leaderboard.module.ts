import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { WebsocketModule } from "../websocket/websocket.module";
import { LeaderboardController } from "./leaderboard.controller";
import { LeaderboardService } from "./leaderboard.service";

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        return {
          store: await redisStore({
            socket: {
              host: configService.get<string>("REDIS_HOST"),
              port: configService.get<number>("REDIS_PORT")!,
            },
          }),
          cacheId: "leaderboard",
        };
      },
    }),
    WebsocketModule,
  ],
  providers: [LeaderboardService],
  controllers: [LeaderboardController],
})
export class LeaderboardModule {}
