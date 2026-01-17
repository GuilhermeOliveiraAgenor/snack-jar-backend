import { FetchRecipeIngredientByRecipeIdUseCase } from "../../application/use-cases/recipe-ingredient/fetch-recipe-ingredient-by-recipe-id";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchRecipeIngredientByRecipeIdController } from "../controllers/recipe-ingredient/fetch-recipe-ingredient-by-recipe-id.controller";

export function makeFetchRecipeIngredientByRecipeIdController() {
  const prisma = getPrismaClient();

  const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchRecipeIngredientByRecipeIdUseCase = new FetchRecipeIngredientByRecipeIdUseCase(
    recipeIngredientRepository,
    recipeRepository,
  );

  return new FetchRecipeIngredientByRecipeIdController(fetchRecipeIngredientByRecipeIdUseCase);
}
