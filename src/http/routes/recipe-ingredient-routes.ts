import { Router } from "express";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";
import { makeCreateRecipeIngredientController } from "../factories/make-create-recipe-ingredient-controller";
import { makeEditRecipeIngredientController } from "../factories/make-edit-recipe-ingredient-controller";
import { makeDeleteRecipeIngredientController } from "../factories/make-delete-recipe-ingredient-controller";

const recipeIngredientRoutes = Router();

recipeIngredientRoutes.use(makeAuthMiddleware());

recipeIngredientRoutes.post("/recipe/ingredient", (req, res, next) => {
  return makeCreateRecipeIngredientController().handle(req, res, next);
});

recipeIngredientRoutes.put("/recipe/ingredient/:id", (req, res, next) => {
  return makeEditRecipeIngredientController().handle(req, res, next);
});

recipeIngredientRoutes.delete("/recipe/ingredient/:id", (req, res, next) => {
  return makeDeleteRecipeIngredientController().handle(req, res, next);
});

export { recipeIngredientRoutes };
