import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { FetchMyRecipeStepsController } from "../controllers/recipe-step/fetch-my-recipe-steps.controller";
import { FetchMyRecipeStepsUseCase } from "../../application/use-cases/recipe-step/fetch-my-recipe-steps";

export function makeFetchMyRecipeStepsController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const fetchMyRecipeStepsUseCase = new FetchMyRecipeStepsUseCase(
    recipeStepRepository,
    recipeRepository,
  );

  return new FetchMyRecipeStepsController(fetchMyRecipeStepsUseCase);
}
