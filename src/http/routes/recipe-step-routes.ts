import { Router } from "express";
import { makeCreateRecipeStepController } from "../factories/make-create-recipe-step.controller";
import { makeEditRecipeStepController } from "../factories/make-edit-recipe-step.controller";
import { makeDeleteRecipeStepController } from "../factories/make-delete-recipe-step-ingredient.controller";
import { makeFetchStepsByRecipeController } from "../factories/make-fetch-steps-by-recipe.controller";

const recipeStepRoutes = Router();

recipeStepRoutes.post("/recipes/steps/:recipeId", (req, res, next) => {
  return makeCreateRecipeStepController().handle(req, res, next);
});

recipeStepRoutes.put("/recipes/steps/:stepId", (req, res, next) => {
  return makeEditRecipeStepController().handle(req, res, next);
});

recipeStepRoutes.delete("/recipes/steps/:stepId", (req, res, next) => {
  return makeDeleteRecipeStepController().handle(req, res, next);
});

recipeStepRoutes.get("/recipes/steps/:recipeId", (req, res, next) => {
  return makeFetchStepsByRecipeController().handle(req, res, next);
});

export { recipeStepRoutes };
