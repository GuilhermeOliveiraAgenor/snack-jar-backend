import { RecipeIngredient } from "../../core/entities/recipeIngredient";
import { BasePresenter } from "./base-presenter";
import { PaginationMeta } from "./pagination.meta";

export class RecipeIngredientPresenter {
  private static map(raw: RecipeIngredient) {
    return {
      id: raw.id.toString(),
      ingredient: raw.ingredient,
      amount: raw.amount,
      unit: raw.unit,
      recipeId: raw.recipeId.toString(),
      createdAt: raw.createdAt,
      createdBy: raw.createdBy.toString(),
      updatedAt: raw.updatedAt,
      updatedBy: raw.updatedBy.toString(),
    };
  }
  static toHTTP(recipeIngredient: RecipeIngredient) {
    return BasePresenter.toResponse(this.map(recipeIngredient));
  }
  static toHTTPPaginated(recipeIngredients: RecipeIngredient[], meta: PaginationMeta) {
    return BasePresenter.toPaginatedResponse(
      recipeIngredients.map(RecipeIngredientPresenter.map),
      meta,
    );
  }
}
