import { GetMeUseCase } from "../../application/use-cases/user/get-me";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { GetMeController } from "../controllers/user/get-me.controller";

export function makeGetMeController() {
  const prisma = getPrismaClient();
  // create use case
  const userRepository = new PrismaUserRepository(prisma);
  const getMeUseCase = new GetMeUseCase(userRepository);

  return new GetMeController(getMeUseCase);
}
