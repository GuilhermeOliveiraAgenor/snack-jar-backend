import { Router } from "express";
import { makeCreateRecipeStepController } from "../factories/make-create-recipe-step.controller";
import { makeEditRecipeStepController } from "../factories/make-edit-recipe-step.controller";
import { makeDeleteRecipeStepController } from "../factories/make-delete-recipe-step-ingredient.controller";
import { makeFetchMyRecipeStepsController } from "../factories/make-fetch-my-recipe-steps.controller";

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
  return makeFetchMyRecipeStepsController().handle(req, res, next);
});

export { recipeStepRoutes };
