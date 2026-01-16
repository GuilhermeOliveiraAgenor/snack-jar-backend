import { EditRecipeIngredientUseCase } from "../../application/use-cases/recipe-ingredient/edit-recipe-ingredient";
import { EditRecipeUseCase } from "../../application/use-cases/recipe/edit-recipe";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { EditRecipeController } from "../controllers/recipe/edit-recipe.controller";

export function makeEditRecipeController(){
    const prisma = getPrismaClient()

    const recipeRepository = new PrismaRecipeRepository(prisma)
    const editRecipeUseCase = new EditRecipeUseCase(recipeRepository)

    return new EditRecipeController(editRecipeUseCase)

}

