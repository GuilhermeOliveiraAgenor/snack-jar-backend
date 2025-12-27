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
    const index = this.items.findIndex((f) => f.id.toString() === recipeStep.id.toString());
    if (index >= 0) this.items.splice(index, 1);
  }
  async findManyByRecipeId(id: string): Promise<RecipeStep[]> {
    const recipeStep = this.items.filter((item) => item.recipeId.toString() === id.toString());
    return recipeStep;
  }
  async findById(id: string): Promise<RecipeStep | null> {
    const recipeStep = this.items.find((item) => item.id.toString() === id.toString());
    if (!recipeStep) {
      return null;
    }
    return recipeStep;
  }
}
