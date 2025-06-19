"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const jwt_decode_1 = require("jwt-decode");
const user_dto_1 = require("../user/user.dto");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const httpPequest = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(httpPequest);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const decryptedToken = (0, jwt_decode_1.jwtDecode)(token);
            httpPequest.user = (0, class_transformer_1.plainToInstance)(user_dto_1.UserTokenDto, decryptedToken, {
                excludeExtraneousValues: true,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map