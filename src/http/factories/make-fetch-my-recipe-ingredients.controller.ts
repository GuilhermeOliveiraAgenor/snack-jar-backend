import { FetchMyRecipeIngredientsUseCase } from "../../application/use-cases/recipe-ingredient/fetch-my-recipe-ingredients";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchMyRecipeIngredientsController } from "../controllers/recipe-ingredient/fetch-my-recipe-ingredients.controller";

export function makeFetchMyRecipeIngredientsController() {
  const prisma = getPrismaClient();

  const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchMyRecipeIngredientsUseCase = new FetchMyRecipeIngredientsUseCase(
    recipeIngredientRepository,
    recipeRepository,
  );

  return new FetchMyRecipeIngredientsController(fetchMyRecipeIngredientsUseCase);
}
