import { Either, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { PaginationMeta } from "../../../http/presenters/pagination.meta";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface FetchRecipesByTitleUseCaseRequest {
  userId: string;
  title: string;
  page?: number;
  perPage?: number;
}

type FetchRecipesByTitleUseCaseResponse = Either<
  NotFoundError,
  {
    recipes: Recipe[];
    meta: PaginationMeta;
  }
>;

export class FetchRecipesByTitleUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    userId,
    title,
    page = 1,
    perPage = 10,
  }: FetchRecipesByTitleUseCaseRequest): Promise<FetchRecipesByTitleUseCaseResponse> {
    const result = await this.recipeRepository.findManyByUserIdAndTitle(
      userId,
      title,
      page,
      perPage,
    );

    const meta: PaginationMeta = {
      page,
      per_page: perPage,
      total_count: result.totalCount,
    };

    return success({
      recipes: result.recipes,
      meta,
    });
  }
}
