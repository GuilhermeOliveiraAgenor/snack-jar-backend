import { RecipeIngredient } from "../../core/entities/recipeIngredient";

export interface RecipeIngredientRepository {
  createMany(recipeIngredient: RecipeIngredient[]): Promise<void>;
  create(recipeIngredient: RecipeIngredient): Promise<void>;
  save(recipeIngredient: RecipeIngredient): Promise<void>;
  delete(id: string): Promise<void>;
}
