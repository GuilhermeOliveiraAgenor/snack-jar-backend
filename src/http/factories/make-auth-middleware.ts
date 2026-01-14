import { JwtService } from "../../infra/auth/JwtService";
import { ensureAuthenticated } from "../middleware/ensure-authenticated";

export function makeAuthMiddleware() {
  const jwtService = new JwtService();
  return ensureAuthenticated(jwtService);
}
