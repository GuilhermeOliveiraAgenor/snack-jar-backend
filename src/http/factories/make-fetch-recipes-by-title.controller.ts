import { FetchRecipesByTitleUseCase } from "../../application/use-cases/recipe/fetch-recipes-by-title";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchRecipesByTitleController } from "../controllers/recipe/fetch-my-recipes-by-title.controller";

export function makeFetchRecipesByTitleController() {
  const prisma = getPrismaClient();

  const recipeRepository = new PrismaRecipeRepository(prisma);
  const fetchRecipesByTitleUseCase = new FetchRecipesByTitleUseCase(recipeRepository);

  return new FetchRecipesByTitleController(fetchRecipesByTitleUseCase);
}
