import { AuthenticateUserUseCase } from "../../application/use-cases/user/authenticate-user";
import { BcryptHashProvider } from "../../infra/auth/BcryptHashProvider";
import { JwtService } from "../../infra/auth/JwtService";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { AuthenticateUserController } from "../controllers/user/authenticate-user-controller";

export function makeAuthenticateUserController() {
  const prisma = getPrismaClient();
  // create use case
  const userRepository = new PrismaUserRepository(prisma);
  const hashProvider = new BcryptHashProvider();
  const jwtService = new JwtService();
  const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository, hashProvider);

  return new AuthenticateUserController(authenticateUserUseCase, jwtService);
}
