import { Router } from "express";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";
import { makeCreateRecipeController } from "../factories/make-create-recipe.controller";
import { makeDeleteRecipeController } from "../factories/make-delete-recipe.controller";
import { makeEditRecipeController } from "../factories/make-edit-recipe.controller";
import { makeFetchMyRecipesController } from "../factories/make-fetch-my-recipe.controller";
import { makGetRecipeByTitleController } from "../factories/make-get-recipe-by-title.controller";

const recipeRoutes = Router();

recipeRoutes.use(makeAuthMiddleware());

recipeRoutes.post("/recipe", (req, res, next) => {
  return makeCreateRecipeController().handle(req, res, next);
});

recipeRoutes.put("/recipe/:id", (req, res, next) => {
  return makeEditRecipeController().handle(req, res, next);
});

recipeRoutes.delete("/recipe/:id", (req, res, next) => {
  return makeDeleteRecipeController().handle(req, res, next);
});

recipeRoutes.get("/menu", (req, res, next) => {
  return makeFetchMyRecipesController().handle(req, res, next);
});

recipeRoutes.get("/recipe", (req, res, next) => {
  return makGetRecipeByTitleController().handle(req, res, next);
});

export { recipeRoutes };
