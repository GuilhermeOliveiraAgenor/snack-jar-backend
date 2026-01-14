import { Router } from "express";
import { makeAuthMiddleware } from "../factories/make-auth-middleware";

const favoriteRecipeRoutes = Router()

favoriteRecipeRoutes.post("/recipe/favorite", makeAuthMiddleware(), (req,res,next) =>{
    return make
})


