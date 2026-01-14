import { DeleteFavoriteRecipeUseCase } from "../../application/use-cases/favorite-recipe/delete-favorite-recipe";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaFavoriteRecipeRepository } from "../../infra/repositories/prisma-favorite-recipe-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { DeleteFavoriteRecipeController } from "../controllers/favorite-recipe/delete-favorite-recipe-controller";


export function makeDeleteFavoriteRecipeController{
    const prisma = getPrismaClient()

    const favoriteRecipeRepository = new PrismaFavoriteRecipeRepository(prisma)
 
    const deleteFavoriteRecipeUseCase = new DeleteFavoriteRecipeUseCase(favoriteRecipeRepository)

    return new DeleteFavoriteRecipeController(deleteFavoriteRecipeUseCase)

}

