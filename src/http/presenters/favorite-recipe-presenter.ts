import { FavoriteRecipe } from "../../core/entities/favoriteRecipe";
import { BasePresenter } from "./base/base-presenter";
import { PaginationMeta } from "./base/pagination-meta";

export class FavoriteRecipePresenter {
  private static map(raw: FavoriteRecipe) {
    return {
      id: raw.id.toString(),
      recipeId: raw.recipeId.toString(),
      createdBy: raw.createdBy.toString(),
      createdAt: raw.createdAt,
    };
  }
  static toHTTP(favoriteRecipe: FavoriteRecipe) {
    return BasePresenter.toResponse(this.map(favoriteRecipe));
  }
  static toHTTPPaginated(favoriteRecipes: FavoriteRecipe[], meta: PaginationMeta) {
    return BasePresenter.toPaginatedResponse(
      favoriteRecipes.map(FavoriteRecipePresenter.map),
      meta,
    );
  }
}
