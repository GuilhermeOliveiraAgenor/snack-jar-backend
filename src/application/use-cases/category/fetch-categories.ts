import { Either, success } from "../../../core/either";
import { Category } from "../../../core/entities/category";
import { PaginationMeta } from "../../../http/presenters/pagination.meta";
import { CategoryRepository } from "../../repositories/category-repository";

type FetchCategoriesUseCaseResponse = Either<
  null,
  {
    categories: Category[];
    meta: PaginationMeta;
  }
>;
export class FetchCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute({ page = 1, perPage = 10 }): Promise<FetchCategoriesUseCaseResponse> {
    const result = await this.categoryRepository.findMany(page, perPage);

    const meta: PaginationMeta = {
      page,
      per_page: perPage,
      total_count: result.totalCount,
    };

    return success({ categories: result.categories, meta });
  }
}
