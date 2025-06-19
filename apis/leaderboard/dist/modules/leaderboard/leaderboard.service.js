"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const CACHE_KEY = "leaderboard";
let LeaderboardService = class LeaderboardService {
    cacheManager;
    webSocketGateway;
    constructor(cacheManager, webSocketGateway) {
        this.cacheManager = cacheManager;
        this.webSocketGateway = webSocketGateway;
    }
    async getTop10Leaderboard() {
        const leaderboardUsers = (await this.cacheManager.get(CACHE_KEY)) || [];
        return leaderboardUsers.sort((a, b) => a.time - b.time).slice(0, 10);
    }
    async registerNewScore(user, dto) {
        const leaderboardUsers = (await this.cacheManager.get(CACHE_KEY)) || [];
        let userLeaderboard = leaderboardUsers?.find((u) => u.user.id === user.id);
        if (userLeaderboard) {
            if (dto.time < userLeaderboard.time) {
                userLeaderboard.time = dto.time;
            }
        }
        else {
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
        }
        catch (error) {
            throw new common_1.UnprocessableEntityException();
        }
    }
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, websocket_gateway_1.WebsocketGateway])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map