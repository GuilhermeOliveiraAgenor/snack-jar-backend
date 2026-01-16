import express from "express";
import { categoryRoutes } from "./http/routes/category-route";
import { errorHandler } from "./http/middleware/error-handler";
import { userRoutes } from "./http/routes/user-routes";
import { favoriteRecipeRoutes } from "./http/routes/favorite-recipe-routes";
import { recipeIngredientRoutes } from "./http/routes/recipe-ingredient-routes";
import { recipeRoutes } from "./http/routes/recipe-route";

export const app = express();

app.use(express.json());

app.use(categoryRoutes);
app.use(userRoutes);
app.use(favoriteRecipeRoutes);
app.use(recipeIngredientRoutes);
app.use(recipeRoutes);

app.use(errorHandler);
