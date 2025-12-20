import { RecipeRepository } from "../../src/application/repositories/recipe-repository";
import { Recipe } from "../../src/core/entities/recipe";

export class InMemoryRecipeRepository implements RecipeRepository {
  public items: Recipe[] = [];

  async create(recipe: Recipe): Promise<void> {
    this.items.push(recipe);
  }
  async save(recipe: Recipe): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === recipe.id);
    this.items[itemIndex] = recipe;
  }
  async findManyByUserId(id: string): Promise<Recipe[]> {
    const recipe = this.items.filter((item) => item.id.toString() === id);
    return recipe;
  }
  async findManyByTitle(title: string): Promise<Recipe[]> {
    const recipe = this.items.filter((item) => item.title === title);
    return recipe;
  }
}
