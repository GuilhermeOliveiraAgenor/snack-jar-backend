import { RecipeRepository } from "../../src/application/repositories/recipe-repository";
import { UniqueEntityID } from "../../src/core/domain/value-objects/unique-entity-id";
import { Recipe } from "../../src/core/entities/recipe";
import { InMemoryRecipeIngredientRepository } from "./in-memory-recipe-ingredient";
import { InMemoryRecipeStepRepository } from "./in-memory-recipe-step";

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
    const recipe = this.items.filter((item) => item.createdBy === new UniqueEntityID(id));
    return recipe;
  }
  async findById(id: string): Promise<Recipe | null> {
    const recipe = this.items.find((item) => item.id.toString() === id);
    if (!recipe) {
      return null;
    }
    return recipe;
  }
  async findManyByTitle(createdBy: string, title: string): Promise<Recipe[]> {
    const recipe = this.items.filter(
      (item) => item.title === title && item.createdBy.toString() == createdBy.toString(),
    );
    return recipe;
  }
  async findByTitle(createdBy: string, title: string): Promise<Recipe | null> {
    const recipe = this.items.find(
      (item) => item.title === title && item.createdBy.toString() == createdBy.toString(),
    );
    if (!recipe) {
      return null;
    }
    return recipe;
  }
}
