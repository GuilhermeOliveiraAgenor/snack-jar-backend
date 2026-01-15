import { CreateRecipeIngredientUseCase } from "../../application/use-cases/recipe-ingredient/create-recipe-ingredient";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaRecipeIngredientRepository } from "../../infra/repositories/prisma-recipe-ingredient-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { CreateRecipeIngredientController } from "../controllers/recipe-ingredient/create-recipe-ingredient-controller";

export function makeCreateRecipeIngredientController(){
    const prisma = getPrismaClient()

    const recipeIngredientRepository = new PrismaRecipeIngredientRepository(prisma);
    const recipeRepository = new PrismaRecipeRepository(prisma);
    
    const createRecipeIngredientUseCase = new CreateRecipeIngredientUseCase(recipeIngredientRepository, recipeRepository)

    return new CreateRecipeIngredientController(createRecipeIngredientUseCase)

}



