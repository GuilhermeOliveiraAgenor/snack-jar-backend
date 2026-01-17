import { FetchRecipeByTitleUseCase } from "../../application/use-cases/recipe/fetch-recipe-by-title";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { FetchRecipeByTitleController } from "../controllers/recipe/fetch-recipe-by-title.controller";

export function makeFetchRecipeByTitleController() {
  const prisma = getPrismaClient();

  const recipeRepository = new PrismaRecipeRepository(prisma);
  const userRepository = new PrismaUserRepository(prisma);
  const fetchRecipeByTitleUseCase = new FetchRecipeByTitleUseCase(recipeRepository, userRepository);

  return new FetchRecipeByTitleController(fetchRecipeByTitleUseCase);
}
