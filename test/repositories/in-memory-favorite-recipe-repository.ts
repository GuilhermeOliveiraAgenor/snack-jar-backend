import { FavoriteRecipeRepository } from "../../src/application/repositories/favorite-recipe-repository";
import { FavoriteRecipe } from "../../src/core/entities/favoriteRecipe";

export class InMemoryFavoriteRecipeRepository implements FavoriteRecipeRepository {
  public items: FavoriteRecipe[] = [];

  async create(favoriteRecipe: FavoriteRecipe): Promise<void> {
    this.items.push(favoriteRecipe);
  }
  async delete(favoriteRecipe: FavoriteRecipe): Promise<void> {
    const index = this.items.findIndex((f) => f.id.toString() === favoriteRecipe.id.toString());
    if (index >= 0) this.items.splice(index, 1);
  }
  async findManyByUserId(id: string): Promise<FavoriteRecipe[]> {
    const favoriteRecipe = this.items.filter((item) => item.createdBy.toString() === id);
    return favoriteRecipe;
  }
  async findById(id: string): Promise<FavoriteRecipe | null> {
    const favoriteRecipe = this.items.find((item) => item.id.toString() === id);
    if (!favoriteRecipe) {
      return null;
    }
    return favoriteRecipe;
  }
}
