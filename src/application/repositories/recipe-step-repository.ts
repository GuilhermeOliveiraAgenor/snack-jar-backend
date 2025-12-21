import { RecipeStep } from "../../core/entities/recipeStep";

export interface RecipeStepRepository {
  createMany(recipeStep: RecipeStep[]): Promise<void>;
  create(recipeStep: RecipeStep): Promise<void>;
  save(recipeStep: RecipeStep): Promise<void>;
  delete(id: string): Promise<void>;
}
