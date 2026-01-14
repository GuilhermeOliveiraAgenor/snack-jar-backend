import { JwtPayload } from "./IJwtPayload";

export interface IJWTService {
  sign(userId: string): string;
  verify(token: string): JwtPayload;
}
