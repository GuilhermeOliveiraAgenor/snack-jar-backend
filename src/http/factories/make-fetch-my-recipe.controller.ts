import { FetchMyRecipesUseCase } from "../../application/use-cases/recipe/fetch-my-recipes";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { FetchMyRecipesController } from "../controllers/recipe/fetch-my-recipes.controller";

export function makeFetchMyRecipesController() {
  const prisma = getPrismaClient();

  const recipeRepository = new PrismaRecipeRepository(prisma);
  const userRepository = new PrismaUserRepository(prisma);

  const fetchMyRecipesUseCase = new FetchMyRecipesUseCase(recipeRepository, userRepository);

  return new FetchMyRecipesController(fetchMyRecipesUseCase);
}
