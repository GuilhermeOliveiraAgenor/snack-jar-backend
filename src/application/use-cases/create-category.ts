import { Category } from "../../core/entities/category";
import { categoriesRepository } from "../repositories/categories-repository";
import { AlreadyExistsError } from "../errors/already-exists-error";

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
  constructor(private categoriesRepository: categoriesRepository) {} // define repository

  async execute({
    name,
    description,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    // verify if category already exists
    const categoryName = await this.categoriesRepository.findByName(name);
    if (categoryName) {
      throw new AlreadyExistsError("category");
    }

    // create object
    const category = Category.create({
      name,
      description,
    });

    await this.categoriesRepository.create(category); // pass to repository

    return { category };
  }
}
