import { RecipeIngredient } from "../../core/entities/recipeIngredient";

export interface RecipeIngredientRepository {
  createMany(recipeIngredient: RecipeIngredient[]): Promise<void>;
  create(recipeIngredient: RecipeIngredient): Promise<void>;
  save(recipeIngredient: RecipeIngredient): Promise<void>;
  delete(recipe: RecipeIngredient): Promise<void>;
  findManyByRecipeId(
    recipeId: string,
    page: number,
    perPage: number,
  ): Promise<{ recipeIngredients: RecipeIngredient[]; totalCount: number }>;
  findById(id: string): Promise<RecipeIngredient | null>;
}
