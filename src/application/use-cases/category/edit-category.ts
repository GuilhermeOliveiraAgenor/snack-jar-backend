import { Either, success, failure } from "../../../core/either";
import { Category } from "../../../core/entities/category";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { categoriesRepository } from "../../repositories/categories-repository";

// create request
interface EditCategoryUseCaseRequest {
  name: Category["name"];
  description: Category["description"];
  id: Category["_id"];
}

// create response
type EditCategoryUseCaseResponse = Either<
  NotFoundError | AlreadyExistsError,
  { category: Category }
>;

export class EditCategoryUseCase {
  constructor(private categoriesRepository: categoriesRepository) {}

  async execute({
    name,
    description,
    id,
  }: EditCategoryUseCaseRequest): Promise<EditCategoryUseCaseResponse> {
    const category = await this.categoriesRepository.findById(id.toString());

    // verify if exists category

    if (!category) {
      return failure(new NotFoundError("category"));
    }

    // update fields
    category.name = name ?? category.name;
    category.description = description ?? category.description;

    // pass to repository
    await this.categoriesRepository.save(category);

    return success({
      category,
    });
  }
}
