import { EditRecipeStepUseCase } from "../../application/use-cases/recipe-step/edit-recipe-step";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaRecipeStepRepository } from "../../infra/repositories/prisma-recipe-step-repository";
import { EditRecipeStepController } from "../controllers/recipe-step/edit-recipe-step.controller";

export function makeEditRecipeStepController() {
  const prisma = getPrismaClient();

  const recipeStepRepository = new PrismaRecipeStepRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const editRecipeStepUseCase = new EditRecipeStepUseCase(recipeStepRepository, recipeRepository);

  return new EditRecipeStepController(editRecipeStepUseCase);
}
