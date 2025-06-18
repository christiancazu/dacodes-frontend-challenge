import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Request } from "express";
import { jwtDecode } from "jwt-decode";
import { UserTokenDto } from "../user/user.dto";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpPequest = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(httpPequest);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decryptedToken = jwtDecode(token);

      httpPequest.user = plainToInstance(UserTokenDto, decryptedToken, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
