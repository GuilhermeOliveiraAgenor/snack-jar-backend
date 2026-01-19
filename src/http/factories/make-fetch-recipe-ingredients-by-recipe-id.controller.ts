import { FetchRecipeIngredientsByRecipeIdUseCase } from "../../application/use-cases/recipe-ingredient/fetch-recipe-ingredients-by-recipe-id";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchRecipeIngredientsByRecipeIdController } from "../controllers/recipe-ingredient/fetch-recipe-ingredients-by-recipe-id.controller";

export function makeFetchRecipeIngredientsByRecipeIdController() {
  const prisma = getPrismaClient();

  const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchRecipeIngredientsByRecipeIdUseCase = new FetchRecipeIngredientsByRecipeIdUseCase(
    recipeIngredientRepository,
    recipeRepository,
  );

  return new FetchRecipeIngredientsByRecipeIdController(fetchRecipeIngredientsByRecipeIdUseCase);
}
