import process from "process";
import jwt from "jsonwebtoken";
import { IJWTService } from "../../core/cryptography/IJwtService";

export class JwtService implements IJWTService {
  sign(userId: string) {
    return jwt.sign(
      {
        sub: userId,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
  }
  verify(token: string): string {
    const { sub } = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
    return sub;
  }
}
