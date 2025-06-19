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
exports.LeaderboardController = void 0;
const common_1 = require("@nestjs/common");
const request_user_param_decorator_1 = require("../user/request-user-param.decorator");
const register_dto_1 = require("./dto/register.dto");
const leaderboard_service_1 = require("./leaderboard.service");
let LeaderboardController = class LeaderboardController {
    leaderboardService;
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    registerNewScore(user, dto) {
        return this.leaderboardService.registerNewScore(user, dto);
    }
    getTop10Leaderboard() {
        return this.leaderboardService.getTop10Leaderboard();
    }
};
exports.LeaderboardController = LeaderboardController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, request_user_param_decorator_1.RequestUserParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.RegisterScoreDto]),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "registerNewScore", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaderboardController.prototype, "getTop10Leaderboard", null);
exports.LeaderboardController = LeaderboardController = __decorate([
    (0, common_1.Controller)("leaderboard"),
    __metadata("design:paramtypes", [leaderboard_service_1.LeaderboardService])
], LeaderboardController);
//# sourceMappingURL=leaderboard.controller.js.map