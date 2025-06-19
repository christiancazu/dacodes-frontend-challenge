import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class WsGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
