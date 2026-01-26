import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchStepsByRecipeController } from "../controllers/recipe-step/fetch-steps-by-recipe.controller";
import { FetchStepsByRecipeUseCase } from "../../application/use-cases/recipe-step/fetch-steps-by-recipe";

export function makeFetchStepsByRecipeController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchStepsByRecipeUseCase = new FetchStepsByRecipeUseCase(
    recipeStepRepository,
    recipeRepository,
  );

  return new FetchStepsByRecipeController(fetchStepsByRecipeUseCase);
}
