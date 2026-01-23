import { Category } from "../../core/entities/category";
import { PaginationMeta } from "./pagination.meta";

export class CategoryPresenter {
  private static map(category: Category) {
    return {
      id: category.id.toString(),
      name: category.name,
      description: category.description,
    };
  }
  static toResponse(category: Category, status = 200) {
    return {
      data: this.map(category),
      status,
      ok: true,
    };
  }

  static toPaginatedResponse(categories: Category[], meta: PaginationMeta, status = 200) {
    return {
      data: categories.map(this.map),
      meta,
      status,
      ok: true,
    };
  }
}
