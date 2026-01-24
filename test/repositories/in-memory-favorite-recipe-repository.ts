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
  async findManyByUserId(
    id: string,
    page: number,
    perPage: number,
  ): Promise<{ favoritesRecipes: FavoriteRecipe[]; totalCount: number }> {
    const userRecipes = this.items.filter((item) => item.createdBy.toString() === id);
    const totalCount = this.items.length;

    const favoritesRecipes = userRecipes.slice((page - 1) * perPage, page * perPage);

    return {
      favoritesRecipes,
      totalCount,
    };
  }
  async existsByUserAndRecipe(createdBy: string, recipeId: string): Promise<boolean> {
    const result = this.items.find(
      (item) => item.createdBy.toString() == createdBy && item.recipeId.toString() === recipeId,
    );
    if (!result) return false;
    return true;
  }
  async findByUserId(id: string): Promise<FavoriteRecipe[]> {
    const recipe = this.items.filter((item) => item.createdBy.toString() === id.toString());
    return recipe;
  }

  async findById(id: string): Promise<FavoriteRecipe | null> {
    const favoriteRecipe = this.items.find((item) => item.id.toString() === id);
    if (!favoriteRecipe) {
      return null;
    }
    return favoriteRecipe;
  }
}
