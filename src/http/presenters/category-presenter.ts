import { Category } from "../../core/entities/category";
import { BasePresenter } from "./base-presenter";
import { PaginationMeta } from "./pagination.meta";

export class CategoryPresenter {
  private static map(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      description: category.description,
    };
  }

  static toHTTP(category: Category) {
    return BasePresenter.toResponse(this.map(category));
  }

  static toHTTPPaginated(categories: Category[], meta: PaginationMeta) {
    return BasePresenter.toPaginatedResponse(categories.map(CategoryPresenter.map), meta);
  }
}
