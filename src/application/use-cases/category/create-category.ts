import { Category } from "../../../core/entities/category";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { Either, failure, success } from "../../../core/either";

interface CreateCategoryUseCaseRequest {
  // create data request
  name: Category["name"];
  description: Category["description"];
}

// create response
type CreateCategoryUseCaseResponse = Either<
  AlreadyExistsError,
  {
    category: Category;
  }
>;

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {} // define repository

  async execute({
    name,
    description,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    // verify if category already exists
    const categoryName = await this.categoriesRepository.findByName(name);
    if (categoryName) {
      return failure(new AlreadyExistsError("category"));
    }

    // create object
    const category = Category.create({
      name,
      description,
    });

    await this.categoriesRepository.create(category); // pass to repository

    return success({
      category,
    });
  }
}
