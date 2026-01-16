import { Router } from "express";
import { makeCreateRecipeController } from "../factories/make-create-recipe-controller";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";

const recipeRoutes = Router();

recipeRoutes.use(makeAuthMiddleware());

recipeRoutes.post("/recipe", (req, res, next) => {
  return makeCreateRecipeController().handle(req, res, next);
});

export { recipeRoutes };
