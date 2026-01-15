import { Router } from "express";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";

const recipeIngredientRoutes = Router()

recipeIngredientRoutes.use(makeAuthMiddleware())

recipeIngredientRoutes.post("/recipe/ingredient", (req,res,next) => {
    
})


