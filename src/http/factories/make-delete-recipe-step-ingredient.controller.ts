import { DeleteRecipeStepUseCase } from "../../application/use-cases/recipe-step/delete-recipe-step";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { DeleteRecipeStepController } from "../controllers/recipe-step/delete-recipe-step.controller";

export function makeDeleteRecipeStepController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const deleteRecipeStepUseCase = new DeleteRecipeStepUseCase(
    recipeStepRepository,
  );

  return new DeleteRecipeStepController(deleteRecipeStepUseCase);
}
