import { RecipeIngredient } from "@prisma/client";
import { RecipeStep } from "../../core/entities/recipeStep";

export interface RecipeStepRepository {
  createMany(recipeStep: RecipeStep[]): Promise<void>;
  create(recipeStep: RecipeStep): Promise<void>;
  save(recipeStep: RecipeStep): Promise<void>;
  delete(recipeStep: RecipeStep): Promise<void>;
  findManyByRecipeId(
    recipeId: string,
    page: number,
    perPage: number,
  ): Promise<{ recipeSteps: RecipeStep[]; totalCount: number }>;
  findByRecipeIdAndStep(recipeId: string, step: number): Promise<RecipeStep | null>;
  findByRecipeId(recipeId: string): Promise<RecipeStep[]>;
  findById(id: string): Promise<RecipeStep | null>;
}
