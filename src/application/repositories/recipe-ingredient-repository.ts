import { RecipeIngredient } from "../../core/entities/recipeIngredient";

export interface RecipeIngredientRepository {
  createMany(ingredients: RecipeIngredient[]): Promise<void>;
}
