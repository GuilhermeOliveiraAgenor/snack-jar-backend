import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface EditRecipeStepUseCaseRequest {
  id: string;
  step?: RecipeStep["step"] | undefined;
  description?: RecipeStep["description"] | undefined;
  updatedBy: string;
}

type EditRecipeStepUseCaseResponse = Either<
  NotFoundError | NotAllowedError | AlreadyExistsError | InvalidCredentialsError,
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

    if (recipeStep.createdBy.toString() != updatedBy) {
      return failure(new NotAllowedError("user"));
    }

    const steps = await this.recipeStepRepository.findManyByRecipeId(
      recipeStep.recipeId.toString(),
    );
    console.log(steps);

    const stepDuplicated = steps.some((s) => s.step === step);
    console.log(stepDuplicated);

    if (stepDuplicated) {
      return failure(new AlreadyExistsError("recipe-step"));
    }

    if (step !== undefined && step <= 0) {
      return failure(new InvalidCredentialsError("recipe-step"));
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
