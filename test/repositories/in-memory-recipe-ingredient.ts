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
    const itemIndex = this.items.findIndex((item) => item.id === recipeIngredient.id);
    this.items[itemIndex] = recipeIngredient;
  }
  async delete(recipeIngredient: RecipeIngredient): Promise<void> {
    const index = this.items.findIndex((f) => f.id.toString() === recipeIngredient.id.toString());
    if (index >= 0) this.items.splice(index, 1);
  }
  async findManyByRecipeId(
    recipeId: string,
    page: number,
    perPage: number,
  ): Promise<{ recipeIngredients: RecipeIngredient[]; totalCount: number }> {
    const ingredients = this.items.filter((item) => item.recipeId.toString() === recipeId);
    const totalCount = this.items.length;

    const recipeIngredients = ingredients.slice((page - 1) * page, page * perPage);
    return { recipeIngredients, totalCount };
  }
  async findById(id: string): Promise<RecipeIngredient | null> {
    const recipeIngredient = this.items.find((item) => item.id.toString() === id.toString());
    if (!recipeIngredient) {
      return null;
    }
    return recipeIngredient;
  }
}
