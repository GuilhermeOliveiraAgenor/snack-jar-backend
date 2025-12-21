import { RecipeStepRepository } from "../../src/application/repositories/recipe-step-repository";
import { RecipeStep } from "../../src/core/entities/recipeStep";

export class InMemoryRecipeStepRepository implements RecipeStepRepository {
  public items: RecipeStep[] = [];

  async createMany(recipeStep: RecipeStep[]): Promise<void> {
    this.items.push(...recipeStep);
  }
  async create(recipeStep: RecipeStep): Promise<void> {
    this.items.push(recipeStep);
  }
  async save(recipeStep: RecipeStep): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === recipeStep.id);
    this.items[itemIndex] = recipeStep;
  }
  async delete(recipeStep: RecipeStep): Promise<void> {
    const itemIndex = this.items.filter((item) => item.id === recipeStep.id);
    this.items = itemIndex;
  }
}
