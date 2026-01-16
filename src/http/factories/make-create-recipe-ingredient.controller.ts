import { CreateRecipeStepUseCase } from "../../application/use-cases/recipe-step/create-recipe-step";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { CreateRecipeStepController } from "../controllers/recipe-step/create-recipe-step.controller";

export function makeCreateRecipeStepController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const createRecipeStepUseCase = new CreateRecipeStepUseCase(
    recipeStepRepository,
    recipeRepository,
  );

  return new CreateRecipeStepController(createRecipeStepUseCase);
}
