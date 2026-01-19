import { EditRecipeStepUseCase } from "../../application/use-cases/recipe-step/edit-recipe-step";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { EditRecipeStepController } from "../controllers/recipe-step/edit-recipe-step.controller";

export function makeEditRecipeStepController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);

  const editRecipeStepUseCase = new EditRecipeStepUseCase(recipeStepRepository);

  return new EditRecipeStepController(editRecipeStepUseCase);
}
