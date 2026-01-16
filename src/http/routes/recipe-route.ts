import { Router } from "express";
import { makeCreateRecipeController } from "../factories/make-create-recipe-controller";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";
import { makeEditRecipeController } from "../factories/make-edit-recipe-controller";
import { makeDeleteRecipeController } from "../factories/make-delete-recipe-controller";
import { FetchMyRecipesController } from "../controllers/recipe/fetch-my-recipes-controller";
import { makeFetchMyRecipesController } from "../factories/make-fetch-my-recipe-controller";
import { makeFetchRecipeByTitleController } from "../factories/make-fetch-recipe-by-title-controller";

const recipeRoutes = Router();

recipeRoutes.use(makeAuthMiddleware());

recipeRoutes.post("/recipe", (req, res, next) => {
  return makeCreateRecipeController().handle(req, res, next);
});

recipeRoutes.put("/recipe", (req,res,next) => {
    return makeEditRecipeController().handle(req,res,next)
})

recipeRoutes.delete("/recipe", (req,res,next) =>{
  return makeDeleteRecipeController().handle(req,res,next)
})

recipeRoutes.get("/menu", (req,res,next) => {
  return makeFetchMyRecipesController().handle(req,res,next)
})

recipeRoutes.get("/recipe", (req,res,next) => {
  return makeFetchRecipeByTitleController().handle(req,res,next)
})

export { recipeRoutes };
