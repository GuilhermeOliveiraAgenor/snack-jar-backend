import { RecipeIngredient } from "../../core/entities/recipeIngredient";

export interface RecipeIngredientRepository {
  createMany(recipeIngredient: RecipeIngredient[]): Promise<void>;
  create(recipeIngredient: RecipeIngredient): Promise<void>;
  save(recipeIngredient: RecipeIngredient): Promise<void>;
  delete(recipe: RecipeIngredient): Promise<void>;
  findManyByRecipeId(id: string): Promise<RecipeIngredient[]>;
  findById(id: string): Promise<RecipeIngredient | null>;
}
