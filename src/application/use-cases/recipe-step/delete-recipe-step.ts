import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";

interface DeleteRecipeStepUseCaseRequest {
  id: string;
  deletedBy: string;
}

type DeleteRecipeStepUseCaseResponse = Either<NotFoundError | NotAllowedError, null>;

export class DeleteRecipeStepUseCase {
  constructor(private recipeStepRepository: RecipeStepRepository) {}
  async execute({
    id,
    deletedBy,
  }: DeleteRecipeStepUseCaseRequest): Promise<DeleteRecipeStepUseCaseResponse> {
    const recipeStep = await this.recipeStepRepository.findById(id);
    if (!recipeStep) {
      return failure(new NotFoundError("recipeStep"));
    }

    if (recipeStep.createdBy.toString() != deletedBy) {
      return failure(new NotAllowedError("user"));
    }

    await this.recipeStepRepository.delete(recipeStep);

    return success(null);
  }
}
