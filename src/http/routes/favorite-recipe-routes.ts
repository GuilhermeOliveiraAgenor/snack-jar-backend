import { Router } from "express";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";
import { makeCreateFavoriteRecipeController } from "../factories/make-create-favorite-recipe.controller";
import { makeFetchMyFavoriteRecipesController } from "../factories/make-fetch-my-favorite-recipe.controller";
import { makeDeleteFavoriteRecipeController } from "../factories/make-delete-favorite-recipe.controller";

const favoriteRecipeRoutes = Router();

favoriteRecipeRoutes.use(makeAuthMiddleware());

favoriteRecipeRoutes.post("/favorites", (req, res, next) => {
  return makeCreateFavoriteRecipeController().handle(req, res, next);
});

favoriteRecipeRoutes.get("/me/favorites", (req, res, next) => {
  return makeFetchMyFavoriteRecipesController().handle(req, res, next);
});

favoriteRecipeRoutes.delete("/favorites", (req, res, next) => {
  return makeDeleteFavoriteRecipeController().handle(req, res, next);
});

export { favoriteRecipeRoutes };
