import { Either, success } from "../../../core/either";
import { Category } from "../../../core/entities/category";
import { CategoryRepository } from "../../repositories/category-repository";

type FetchCategoriesUseCaseResponse = Either<
  null,
  {
    category: Category[];
  }
>;

export class FetchCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}
  async execute(): Promise<FetchCategoriesUseCaseResponse> {
    const category = await this.categoryRepository.findMany();

    return success({ category });
  }
}
