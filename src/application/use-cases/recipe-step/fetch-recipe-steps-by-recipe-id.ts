import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface FetchRecipeStepsByRecipeIdUseCaseRequest {
  id: string;
}
type FetchRecipeStepsByRecipeIdResponse = Either<
  NotFoundError,
  {
    recipeSteps: RecipeStep[];
  }
>;

export class FetchRecipeStepsByRecipeIdUseCase {
  constructor(
    private recipeStepRepository: RecipeStepRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    id,
  }: FetchRecipeStepsByRecipeIdUseCaseRequest): Promise<FetchRecipeStepsByRecipeIdResponse> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    const recipeSteps = await this.recipeStepRepository.findManyByRecipeId(recipe.id.toString());

    return success({
      recipeSteps,
    });
  }
}
