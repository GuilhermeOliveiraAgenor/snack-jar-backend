import { Category } from "../../core/entities/category";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { categoriesRepository } from "../repositories/categories-repository";
import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";

interface CreateCategoryUseCaseRequest {
  // create data request
  name: Category["name"];
  description: Category["description"];
}

interface CreateCategoryUseCaseResponse {
  // create response
  category: Category;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: categoriesRepository) {} // define repository

  async execute({
    name,
    description,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    // verify if category already exists
    const categoryName = await this.categoriesRepository.findByName(name);
    if (categoryName) {
      throw new ResourceNotFoundError("Category");
    }

    const category = Category.create({
      name,
      description,
    });

    await this.categoriesRepository.create(category);
  }
}
