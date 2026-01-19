import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { FetchRecipeStepsByRecipeIdUseCase } from "../../application/use-cases/recipe-step/fetch-recipe-steps-by-recipe-id";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchRecipeStepsByRecipeIdController } from "../controllers/recipe-step/fetch-recipe-steps-by-recipe-id.controller";

export function makeFetchRecipeStepsByRecipeIdController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchRecipeStepsByRecipeIdUseCase = new FetchRecipeStepsByRecipeIdUseCase(
    recipeStepRepository,
    recipeRepository,
  );

  return new FetchRecipeStepsByRecipeIdController(fetchRecipeStepsByRecipeIdUseCase);
}
