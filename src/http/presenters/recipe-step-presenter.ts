import { RecipeStep } from "../../core/entities/recipeStep";
import { BasePresenter } from "./base-presenter";
import { PaginationMeta } from "./pagination.meta";

export class RecipeStepPresenter {
  private static map(raw: RecipeStep) {
    return {
      id: raw.id.toString(),
      step: raw.step,
      description: raw.description,
      recipeId: raw.recipeId.toString(),
      createdAt: raw.createdAt,
      createdBy: raw.createdBy.toString(),
      updatedAt: raw.updatedAt,
      updatedBy: raw.updatedBy?.toString(),
    };
  }
  static toHTTP(recipeStep: RecipeStep) {
    return BasePresenter.toResponse(this.map(recipeStep));
  }
  static toHTTPPaginated(recipeSteps: RecipeStep[], meta: PaginationMeta) {
    return BasePresenter.toPaginatedResponse(recipeSteps.map(RecipeStepPresenter.map), meta);
  }
}
