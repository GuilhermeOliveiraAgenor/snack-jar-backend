import { CreateRecipeUseCase } from "../../application/use-cases/recipe/create-recipe";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaCategoryRepository } from "../../infra/repositories/prisma-category-repository";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { CreateRecipeController } from "../controllers/recipe/create-recipe-controller";

export function makeCreateRecipeController() {
  const prisma = getPrismaClient();

  const recipeRepository = new PrismaRecipeRepository(prisma);
  const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const categoryRepository = new PrismaCategoryRepository(prisma);

  const createRecipeUseCase = new CreateRecipeUseCase(
    recipeRepository,
    recipeIngredientRepository,
    recipeStepRepository,
    categoryRepository,
  );

  return new CreateRecipeController(createRecipeUseCase);
}
