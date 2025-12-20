import { RecipeIngredientRepository } from "../../src/application/repositories/recipe-ingredient-repository";
import { RecipeIngredient } from "../../src/core/entities/recipeIngredient";

export class InMemoryRecipeIngredientRepository implements RecipeIngredientRepository {
  public items: RecipeIngredient[] = [];

  async createMany(recipeIngredient: RecipeIngredient[]): Promise<void> {
    this.items.push(...recipeIngredient);
  }
}
