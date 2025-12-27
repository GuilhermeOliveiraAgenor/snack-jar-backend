import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";

interface FetchRecipeStepByRecipeIdUseCaseRequest {
  id: string;
}
type FetchRecipeStepByRecipeIdResponse = Either<
  NotFoundError,
  {
    recipeStep: RecipeStep[];
  }
>;

export class FetchRecipeStepByRecipeIdUseCase {
  constructor(
    private recipeStepRepository: RecipeStepRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    id,
  }: FetchRecipeStepByRecipeIdUseCaseRequest): Promise<FetchRecipeStepByRecipeIdResponse> {
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    const recipeStep = await this.recipeStepRepository.findManyByRecipeId(recipe.id.toString());

    return success({
      recipeStep,
    });
  }
}
