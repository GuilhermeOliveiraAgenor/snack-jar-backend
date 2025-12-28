import { FavoriteRecipe } from "../../core/entities/favoriteRecipe";

export interface FavoriteRecipeRepository {
  create(favoriteRecipe: FavoriteRecipe): Promise<void>;
  delete(favoriteRecipe: FavoriteRecipe): Promise<void>;
  findManyByUserId(id: string): Promise<FavoriteRecipe[]>;
  findById(id: string): Promise<FavoriteRecipe | null>;
}
