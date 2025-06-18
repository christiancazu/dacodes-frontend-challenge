import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import "./dotenv";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
