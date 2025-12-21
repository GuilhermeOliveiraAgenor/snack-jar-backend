import { RecipeIngredientRepository } from "../../src/application/repositories/recipe-ingredient-repository";
import { RecipeIngredient } from "../../src/core/entities/recipeIngredient";

export class InMemoryRecipeIngredientRepository implements RecipeIngredientRepository {
  public items: RecipeIngredient[] = [];

  async createMany(recipeIngredient: RecipeIngredient[]): Promise<void> {
    this.items.push(...recipeIngredient);
  }
  async create(recipeIngredient: RecipeIngredient): Promise<void> {
    this.items.push(recipeIngredient);
  }
  async save(recipeIngredient: RecipeIngredient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id)
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
