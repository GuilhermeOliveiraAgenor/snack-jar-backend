import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { InvalidFieldsError } from "../../errors/invalid-fields-error";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface CreateRecipeStepUseCaseRequest {
  recipeId: string;
  step: RecipeStep["step"];
  description: RecipeStep["description"];
  createdBy: string;
}

type CreateRecipeStepUseCaseResponse = Either<
  NotFoundError | NotAllowedError | AlreadyExistsError | InvalidFieldsError,
  {
    recipeStep: RecipeStep;
  }
>;

export class CreateRecipeStepUseCase {
  constructor(
    private recipeStepRepository: RecipeStepRepository,
    private recipeRepository: RecipeRepository,
  ) {}

  async execute({
    recipeId,
    step,
    description,
    createdBy,
  }: CreateRecipeStepUseCaseRequest): Promise<CreateRecipeStepUseCaseResponse> {
    // verify if recipeId exits
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe.createdBy.toString() !== createdBy) {
      return failure(new NotAllowedError("user"));
    }

    if (recipe.status !== "ACTIVE") {
      return failure(new NotAllowedError("recipe"));
    }if (recipe.status !== "ACTIVE") {
      return failure(new NotAllowedError("recipe"));
    }

    const steps = await this.recipeStepRepository.findManyByRecipeId(recipe.id.toString());
    const stepDuplicated = steps.some((s) => s.step === step);

    if (stepDuplicated) {
      return failure(new AlreadyExistsError("recipeStep"));
    }

    if (step <= 0) {
      return failure(new InvalidFieldsError("recipeStep"));
    }

    const recipeStep = RecipeStep.create({
      step,
      description,
      recipeId: recipe.id,
      createdBy: new UniqueEntityID(createdBy),
    });

    await this.recipeStepRepository.create(recipeStep);

    return success({
      recipeStep,
    });
  }
}
