import { Request, Response, NextFunction } from "express";
import { IJWTService } from "../../core/cryptography/IJwtService";
import { JwtPayload } from "../../core/cryptography/IJwtPayload";

export function ensureAuthenticated(jwtService: IJWTService) {
  return (req: Request, res: Response, next: NextFunction) => {
    // variable receive header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // separate Bearer
    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const { sub } = jwtService.verify(token) as JwtPayload;

      // set user id
      req.user = {
        id: sub,
      };

      next();
    } catch (error) {
      return res.status(401).json({ message: `Invalide Token ${error}` });
    }
  };
}
