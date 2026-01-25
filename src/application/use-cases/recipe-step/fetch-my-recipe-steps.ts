import { Either, failure, success } from "../../../core/either";
import { RecipeStep } from "../../../core/entities/recipeStep";
import { PaginationMeta } from "../../../http/presenters/base/pagination-meta";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { RecipeStepRepository } from "../../repositories/recipe-step-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";

interface FetchMyRecipeStepsUseCaseRequest {
  recipeId: string;
  userId: string;
  page?: number;
  perPage?: number;
}
type FetchMyRecipeStepsResponse = Either<
  NotFoundError,
  {
    recipeSteps: RecipeStep[];
    meta: PaginationMeta;
  }
>;

export class FetchMyRecipeStepsUseCase {
  constructor(
    private recipeStepRepository: RecipeStepRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    recipeId,
    userId,
    page = 1,
    perPage = 10,
  }: FetchMyRecipeStepsUseCaseRequest): Promise<FetchMyRecipeStepsResponse> {
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe.createdBy.toString() !== userId) {
      return failure(new NotAllowedError("user"));
    }

    const result = await this.recipeStepRepository.findManyByRecipeId(
      recipe.id.toString(),
      page,
      perPage,
    );

    const meta: PaginationMeta = {
      page,
      per_page: perPage,
      total_count: result.totalCount,
    };

    return success({
      recipeSteps: result.recipeSteps,
      meta,
    });
  }
}
