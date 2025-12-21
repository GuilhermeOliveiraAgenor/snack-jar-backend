import { RecipeStepRepository } from "../../src/application/repositories/recipe-step-repository";
import { RecipeStep } from "../../src/core/entities/recipeStep";

export class InMemoryRecipeStepRepository implements RecipeStepRepository {
  public items: RecipeStep[] = [];

  async createMany(stepRecipe: RecipeStep[]): Promise<void> {
    this.items.push(...stepRecipe);
  }
}
