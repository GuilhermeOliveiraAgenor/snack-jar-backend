import { Recipe } from "../../core/entities/recipe";

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  save(recipe: Recipe): Promise<void>;
  findManyByUserId(id: string): Promise<Recipe[]>;
  findManyByTitle(name: string): Promise<Recipe[]>;
}
