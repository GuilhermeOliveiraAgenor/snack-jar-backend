import { Recipe } from "../../core/entities/recipe";

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  save(recipe: Recipe): Promise<void>;
  findManyByUserId(id: string): Promise<Recipe[]>;
  findManyByName(name: string): Promise<Recipe[]>;
}
