import { DeleteRecipeUseCase } from "../../application/use-cases/recipe/delete-recipe";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { DeleteRecipeController } from "../controllers/recipe/delete-recipe-controller";

export function makeDeleteRecipeController(){
    const prisma = getPrismaClient()

    const recipeRepository = new PrismaRecipeRepository(prisma)
    const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository)

    return new DeleteRecipeController(deleteRecipeUseCase)

}
