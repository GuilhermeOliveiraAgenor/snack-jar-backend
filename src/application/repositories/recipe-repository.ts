import { Recipe } from "../../core/entities/recipe";

export interface RecipeRepository {
  create(recipe: Recipe): Promise<void>;
  save(recipe: Recipe): Promise<void>;
  findManyByUserId(id: string): Promise<Recipe[]>;
  findManyByTitle(createdBy: string, title: string): Promise<Recipe[]>;
  findByTitle(createdBy: string, title: string): Promise<Recipe | null>;
  findById(id: string): Promise<Recipe | null>;
}
