import { FavoriteRecipe } from "../../core/entities/favoriteRecipe";

export interface FavoriteRecipeRepository {
  create(favoriteRecipe: FavoriteRecipe): Promise<void>;
  delete(favoriteRecipe: FavoriteRecipe): Promise<void>;
  findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<{ favoritesRecipes: FavoriteRecipe[]; totalCount: number }>;
  existsByUserAndRecipe(userId: string, recipeId: string): Promise<boolean>;
  findById(id: string): Promise<FavoriteRecipe | null>;
}
