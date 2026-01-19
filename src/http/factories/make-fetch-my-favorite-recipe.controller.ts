import { FetchMyFavoriteRecipesUseCase } from "../../application/use-cases/favorite-recipe/fetch-my-favorite-recipes";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaFavoriteRecipeRepository } from "../../infra/repositories/prisma-favorite-recipe-repository";
import { PrismaUserRepository } from "../../infra/repositories/prisma-user-repository";
import { FetchMyFavoriteRecipesController } from "../controllers/favorite-recipe/fetch-my-favorite-recipes.controller";

export function makeFetchMyFavoriteRecipesController() {
  const prisma = getPrismaClient();

  const favoriteRecipeRepository = new PrismaFavoriteRecipeRepository(prisma);
  const userRepository = new PrismaUserRepository(prisma);

  const fetchMyFavoriteRecipesUseCase = new FetchMyFavoriteRecipesUseCase(
    favoriteRecipeRepository,
  );

  return new FetchMyFavoriteRecipesController(fetchMyFavoriteRecipesUseCase);
}
