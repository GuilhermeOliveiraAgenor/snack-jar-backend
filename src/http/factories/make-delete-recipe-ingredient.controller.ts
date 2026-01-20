import { DeleteRecipeIngredientUseCase } from "../../application/use-cases/recipe-ingredient/delete-recipe-ingredient";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { DeleteRecipeIngredientController } from "../controllers/recipe-ingredient/delete-recipe-ingredient.controller";

export function makeDeleteRecipeIngredientController() {
  const prisma = getPrismaClient();

  const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const deleteRecipeIngredientUseCase = new DeleteRecipeIngredientUseCase(
    recipeIngredientRepository,recipeRepository
  );

  return new DeleteRecipeIngredientController(deleteRecipeIngredientUseCase);
}
