import { EditRecipeIngredientUseCase } from "../../application/use-cases/recipe-ingredient/edit-recipe-ingredient";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { EditRecipeIngredientController } from "../controllers/recipe-ingredient/edit-recipe-ingredient-controller";

export function makeEditRecipeIngredientController(){

    const prisma = getPrismaClient()

    const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma)
    const editRecipeIngredientUseCase = new EditRecipeIngredientUseCase(recipeIngredientRepository)

    return new EditRecipeIngredientController(editRecipeIngredientUseCase)

}


