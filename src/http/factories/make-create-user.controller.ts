import { CreateUserUseCase } from "../../application/use-cases/user/create-user";
import { BcryptHashProvider } from "../../infra/auth/BcryptHashProvider";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { CreateUserController } from "../controllers/user/create-user.controller";

export function makeCreateUserController() {
  const prisma = getPrismaClient();
  // create use case
  const userRepository = new PrismaUserRepository(prisma);
  const hashProvider = new BcryptHashProvider();
  const createUserUseCase = new CreateUserUseCase(userRepository, hashProvider);

  return new CreateUserController(createUserUseCase);
}
