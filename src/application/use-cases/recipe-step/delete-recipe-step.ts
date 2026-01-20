import { Either, failure, success } from "../../../core/either";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface DeleteRecipeStepUseCaseRequest {
  id: string;
  deletedBy: string;
}

type DeleteRecipeStepUseCaseResponse = Either<NotFoundError | NotAllowedError, null>;

export class DeleteRecipeStepUseCase {
  constructor(
    private recipeStepRepository: RecipeStepRepository,
    private recipeRepository: RecipeRepository,
  ) {}
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

    const recipe = await this.recipeRepository.findById(recipeStep.recipeId.toString());

    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe?.status.toString() !== "ACTIVE") {
      return failure(new NotAllowedError("recipe"));
    }
    await this.recipeStepRepository.delete(recipeStep);

    return success(null);
  }
}
