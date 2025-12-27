import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface EditRecipeStepUseCaseRequest {
  id: string;
  step: RecipeStep["step"];
  description: RecipeStep["description"];
  updatedBy: string;
}

type EditRecipeStepUseCaseResponse = Either<
  NotFoundError,
  {
    recipeStep: RecipeStep;
  }
>;

export class EditRecipeStepUseCase {
  constructor(private recipeStepRepository: RecipeStepRepository) {}
  async execute({
    id,
    step,
    description,
    updatedBy,
  }: EditRecipeStepUseCaseRequest): Promise<EditRecipeStepUseCaseResponse> {
    const recipeStep = await this.recipeStepRepository.findById(id);
    if (!recipeStep) {
      return failure(new NotFoundError("recipe-step"));
    }

    recipeStep.step = step ?? recipeStep.step;
    recipeStep.description = description ?? recipeStep.description;
    recipeStep.updatedBy = new UniqueEntityID(updatedBy);

    await this.recipeStepRepository.save(recipeStep);

    return success({
      recipeStep,
    });
  }
}
