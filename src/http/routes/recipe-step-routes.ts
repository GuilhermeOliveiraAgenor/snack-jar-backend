import { Router } from "express";
import { makeCreateRecipeStepController } from "../factories/make-create-recipe-ingredient.controller";
import { makeEditRecipeStepController } from "../factories/make-edit-recipe-step.controller";
import { makeDeleteRecipeStepController } from "../factories/make-delete-recipe-step-ingredient.controller";
import { makeFetchRecipeStepsByRecipeIdController } from "../factories/make-fetch-recipe-steps-by-recipe-id.controller";

const recipeStepRoutes = Router();

recipeStepRoutes.post("/recipe/step/:id", (req, res, next) => {
  return makeCreateRecipeStepController().handle(req, res, next);
});

recipeStepRoutes.put("/recipe/step/:id", (req, res, next) => {
  return makeEditRecipeStepController().handle(req, res, next);
});

recipeStepRoutes.delete("/recipe/step/:id", (req, res, next) => {
  return makeDeleteRecipeStepController().handle(req, res, next);
});

recipeStepRoutes.get("/recipe/step/:id", (req, res, next) => {
  return makeFetchRecipeStepsByRecipeIdController().handle(req, res, next);
});

export { recipeStepRoutes };
