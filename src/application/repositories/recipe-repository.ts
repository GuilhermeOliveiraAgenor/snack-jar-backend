import { Recipe } from "../../core/entities/recipe";

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  save(recipe: Recipe): Promise<void>;
  findManyByUserId(id: string): Promise<Recipe[]>;
  findManyByTitle(title: string, userId: string): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | null>;
}
