import { GetRecipeByTitleUseCase } from "../../application/use-cases/recipe/fetch-recipes-by-title";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { GetRecipeByTitleController } from "../controllers/recipe/get-recipe-by-title.controller";

export function makGetRecipeByTitleController() {
  const prisma = getPrismaClient();

  const recipeRepository = new PrismaRecipeRepository(prisma);
  const fetchRecipeByTitleUseCase = new GetRecipeByTitleUseCase(recipeRepository);

  return new GetRecipeByTitleController(fetchRecipeByTitleUseCase);
}
