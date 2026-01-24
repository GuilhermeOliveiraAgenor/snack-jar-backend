import { RecipeStep } from "../../core/entities/recipeStep";

export interface RecipeStepRepository {
  createMany(recipeStep: RecipeStep[]): Promise<void>;
  create(recipeStep: RecipeStep): Promise<void>;
  save(recipeStep: RecipeStep): Promise<void>;
  delete(recipeStep: RecipeStep): Promise<void>;
  findManyByRecipeId(
    id: string,
    page: number,
    perPage: number,
  ): Promise<{ recipeSteps: RecipeStep[]; totalCount: number }>;
  findById(id: string): Promise<RecipeStep | null>;
}
