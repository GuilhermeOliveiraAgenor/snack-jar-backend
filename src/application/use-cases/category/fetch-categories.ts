import { Either, success } from "../../../core/either";
import { Category } from "../../../core/entities/category";
import { CategoriesRepository } from "../../repositories/categories-repository";

type FetchCategoriesUseCaseResponse = Either<
  null,
  {
    category: Category[];
  }
>;

export class FetchCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}
  async execute(): Promise<FetchCategoriesUseCaseResponse> {
    const category = await this.categoriesRepository.findMany();

    return success({ category });
  }
}
