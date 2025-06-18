import { UserLeaderboard } from "@dacodes/lib";
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const RequestUserParam = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as UserLeaderboard;
  }
);
