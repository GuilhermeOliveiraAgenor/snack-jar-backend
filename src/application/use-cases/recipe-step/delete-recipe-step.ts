import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface DeleteRecipeStepUseCaseRequest {
  id: string;
  deletedBy: string;
}

type DeleteRecipeStepUseCaseResponse = Either<NotFoundError, null>;

export class DeleteRecipeStepUseCase {
  constructor(private recipeStepRepository: RecipeStepRepository) {}
  async execute({
    id,
    deletedBy,
  }: DeleteRecipeStepUseCaseRequest): Promise<DeleteRecipeStepUseCaseResponse> {
    const recipeStep = await this.recipeStepRepository.findById(id);
    if (!recipeStep) {
      return failure(new NotFoundError("recipe-step"));
    }

    recipeStep.deletedBy = new UniqueEntityID(deletedBy);

    await this.recipeStepRepository.delete(recipeStep);

    return success(null);
  }
}
