import { DeleteRecipeIngredientUseCase } from "../../application/use-cases/recipe-ingredient/delete-recipe-ingredient";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { DeleteRecipeIngredientController } from "../controllers/recipe-ingredient/delete-recipe-ingredient-controller";

export function makeDeleteRecipeIngredientController(){

    const prisma = getPrismaClient()

    const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma)
    const deleteRecipeIngredientUseCase = new DeleteRecipeIngredientUseCase(recipeIngredientRepository)

    return new DeleteRecipeIngredientController(deleteRecipeIngredientUseCase)

}


