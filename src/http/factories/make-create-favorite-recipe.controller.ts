import { CreateFavoriteRecipeUseCase } from "../../application/use-cases/favorite-recipe/create-favorite-recipe";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaFavoriteRecipeRepository } from "../../infra/repositories/prisma-favorite-recipe-repository";
import { CreateFavoriteRecipeController } from "../controllers/favorite-recipe/create-favorite-recipe.controller";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { PrismaRecipeRepository } from "../../infra/repositories/prisma-recipe-repository";

export function makeCreateFavoriteRecipeController() {
  const prisma = getPrismaClient();
  const favoriteRecipeRepository = new PrismaFavoriteRecipeRepository(prisma);
  const userRepository = new PrismaUserRepository(prisma);
  const recipeRepository = new PrismaRecipeRepository(prisma);

  const createFavoriteRecipeUseCase = new CreateFavoriteRecipeUseCase(
    favoriteRecipeRepository,
    recipeRepository,
  );

  return new CreateFavoriteRecipeController(createFavoriteRecipeUseCase);
}
