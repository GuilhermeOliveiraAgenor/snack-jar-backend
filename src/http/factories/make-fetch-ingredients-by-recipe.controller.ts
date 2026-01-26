import { FetchIngredientsByRecipeUseCase } from "../../application/use-cases/recipe-ingredient/fetch-ingredients-by-recipe";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchIngredientsByRecipeController } from "../controllers/recipe-ingredient/fetch-ingredients-by-recipe.controller";

export function makeFetchIngredientsByRecipeController() {
  const prisma = getPrismaClient();

  const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchIngredientsByRecipeUseCase = new FetchIngredientsByRecipeUseCase(
    recipeIngredientRepository,
    recipeRepository,
  );

  return new FetchIngredientsByRecipeController(fetchIngredientsByRecipeUseCase);
}
