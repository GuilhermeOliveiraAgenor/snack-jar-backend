import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { InvalidFieldsError } from "../../errors/invalid-fields-error";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface EditRecipeStepUseCaseRequest {
  id: string;
  step?: RecipeStep["step"] | undefined;
  description?: RecipeStep["description"] | undefined;
  updatedBy: string;
}

type EditRecipeStepUseCaseResponse = Either<
  NotFoundError | NotAllowedError | AlreadyExistsError | InvalidFieldsError,
  {
    recipeStep: RecipeStep;
  }
>;

export class EditRecipeStepUseCase {
  constructor(
    private recipeStepRepository: RecipeStepRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    id,
    step,
    description,
    updatedBy,
  }: EditRecipeStepUseCaseRequest): Promise<EditRecipeStepUseCaseResponse> {
    const recipeStep = await this.recipeStepRepository.findById(id);
    if (!recipeStep) {
      return failure(new NotFoundError("recipeStep"));
    }

    if (recipeStep.createdBy.toString() != updatedBy) {
      return failure(new NotAllowedError("user"));
    }

    const steps = await this.recipeStepRepository.findManyByRecipeId(
      recipeStep.recipeId.toString(),
    );

    const stepDuplicated = steps.some((s) => s.step === step && s.id.toString() !== id);

    if (stepDuplicated) {
      return failure(new AlreadyExistsError("recipeStep"));
    }

    if (step && step <= 0) {
      return failure(new InvalidFieldsError("recipeStep"));
    }

    const recipe = await this.recipeRepository.findById(recipeStep.recipeId.toString());

    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe.status !== "ACTIVE") {
      return failure(new NotAllowedError("recipe"));
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
