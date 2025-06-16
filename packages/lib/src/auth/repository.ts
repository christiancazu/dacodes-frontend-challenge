import { AuthUser } from "./domain";
import { AuthDto } from "./dto";

export interface AuthRepository {
  login: (dto: AuthDto) => Promise<AuthUser>;
}
