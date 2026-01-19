import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { FetchRecipeStepByRecipeIdUseCase } from "../../application/use-cases/recipe-step/fetch-recipe-step-by-recipe-id";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchRecipeStepByRecipeIdController } from "../controllers/recipe-step/fetch-recipe-step-by-recipe-id.controller";

export function makeFetchRecipeStepByRecipeIdController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchRecipeStepByRecipeIdUseCase = new FetchRecipeStepByRecipeIdUseCase(
    recipeStepRepository,
    recipeRepository,
  );

  return new FetchRecipeStepByRecipeIdController(fetchRecipeStepByRecipeIdUseCase);
}
