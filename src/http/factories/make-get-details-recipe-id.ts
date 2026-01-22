import { GetDetailsByRecipeIdUseCase } from "../../application/use-cases/recipe/get-details-by-recipe-id";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeDetailsRepository } from "../../infra/repositories/prisma-recipe-details-repository";
import { GetDetailsByRecipeIdController } from "../controllers/recipe/get-details-by-recipe-id.controller";

export function makeGetDetailsByRecipeIdController() {
  const prisma = getPrismaClient();

  const recipeDetailsRepository = new PrismaRecipeDetailsRepository(prisma);
  const getDetailsByRecipeIdUseCase = new GetDetailsByRecipeIdUseCase(recipeDetailsRepository);

  return new GetDetailsByRecipeIdController(getDetailsByRecipeIdUseCase);
}
