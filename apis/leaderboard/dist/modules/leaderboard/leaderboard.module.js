"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const websocket_module_1 = require("../websocket/websocket.module");
const leaderboard_controller_1 = require("./leaderboard.controller");
const leaderboard_service_1 = require("./leaderboard.service");
let LeaderboardModule = class LeaderboardModule {
};
exports.LeaderboardModule = LeaderboardModule;
exports.LeaderboardModule = LeaderboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                isGlobal: true,
                useFactory: async (configService) => {
                    return {
                        store: await (0, cache_manager_redis_store_1.redisStore)({
                            socket: {
                                host: configService.get("REDIS_HOST"),
                                port: configService.get("REDIS_PORT"),
                            },
                        }),
                        cacheId: "leaderboard",
                    };
                },
            }),
            websocket_module_1.WebsocketModule,
        ],
        providers: [leaderboard_service_1.LeaderboardService],
        controllers: [leaderboard_controller_1.LeaderboardController],
    })
], LeaderboardModule);
//# sourceMappingURL=leaderboard.module.js.map