import { JwtService } from "../../infra/auth/JwtService";
import { ensureAuthenticated } from "../middleware/ensure-Authenticated";

export function makeAuthMiddleware() {
  const jwtService = new JwtService();
  return ensureAuthenticated(jwtService);
}
