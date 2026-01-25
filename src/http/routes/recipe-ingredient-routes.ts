import { Router } from "express";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";
import { makeCreateRecipeIngredientController } from "../factories/make-create-recipe-ingredient.controller";
import { makeDeleteRecipeIngredientController } from "../factories/make-delete-recipe-ingredient.controller";
import { makeEditRecipeIngredientController } from "../factories/make-edit-recipe-ingredient.controller";
import { makeFetchMyRecipeIngredientsController } from "../factories/make-fetch-my-recipe-ingredients.controller";

const recipeIngredientRoutes = Router();

recipeIngredientRoutes.use(makeAuthMiddleware());

recipeIngredientRoutes.post("/recipes/ingredients/:recipeId", (req, res, next) => {
  return makeCreateRecipeIngredientController().handle(req, res, next);
});

recipeIngredientRoutes.put("/recipes/ingredients/:ingredientId", (req, res, next) => {
  return makeEditRecipeIngredientController().handle(req, res, next);
});

recipeIngredientRoutes.delete("/recipes/ingredients/:ingredientId", (req, res, next) => {
  return makeDeleteRecipeIngredientController().handle(req, res, next);
});

recipeIngredientRoutes.get("/recipes/ingredients/:recipeId", (req, res, next) => {
  return makeFetchMyRecipeIngredientsController().handle(req, res, next);
});

export { recipeIngredientRoutes };
