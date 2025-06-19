"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUserParam = void 0;
const common_1 = require("@nestjs/common");
exports.RequestUserParam = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=request-user-param.decorator.js.map