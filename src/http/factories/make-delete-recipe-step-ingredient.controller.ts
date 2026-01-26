import { DeleteRecipeStepUseCase } from "../../application/use-cases/recipe-step/delete-recipe-step";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { DeleteRecipeStepController } from "../controllers/recipe-step/delete-recipe-step.controller";

export function makeDeleteRecipeStepController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const deleteRecipeStepUseCase = new DeleteRecipeStepUseCase(
    recipeStepRepository,
    recipeRepository,
  );

  return new DeleteRecipeStepController(deleteRecipeStepUseCase);
}
