import { Either, success } from "../../../core/either";
import { FavoriteRecipe } from "../../../core/entities/favoriteRecipe";
import { PaginationMeta } from "../../../http/presenters/pagination.meta";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";

interface FetchMyFavoriteRecipesRequest {
  createdBy: string;
  page?: number;
  perPage?: number;
}

type FetchMyFavoriteRecipesResponse = Either<
  NotFoundError,
  {
    favoriteRecipes: FavoriteRecipe[];
    meta: PaginationMeta;
  }
>;

export class FetchMyFavoriteRecipesUseCase {
  constructor(private favoriteRecipeRepository: FavoriteRecipeRepository) {}
  async execute({
    createdBy,
    page = 1,
    perPage = 10,
  }: FetchMyFavoriteRecipesRequest): Promise<FetchMyFavoriteRecipesResponse> {
    const result = await this.favoriteRecipeRepository.findManyByUserId(createdBy, page, perPage);

    const meta: PaginationMeta = {
      page,
      per_page: perPage,
      total_count: result.totalCount,
      filters: {},
    };

    return success({
      favoriteRecipes: result.favoritesRecipes,
      meta,
    });
  }
}
