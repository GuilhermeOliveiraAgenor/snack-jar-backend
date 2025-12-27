import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
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
  NotFoundError,
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
