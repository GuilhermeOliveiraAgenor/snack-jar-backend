import { Either, success } from "../../../core/either";
import { FavoriteRecipe } from "../../../core/entities/favoriteRecipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";

interface FetchMyFavoriteRecipesRequest {
  createdBy: string;
}

type FetchMyFavoriteRecipesResponse = Either<
  NotFoundError,
  {
    favoriteRecipes: FavoriteRecipe[];
  }
>;

export class FetchMyFavoriteRecipesUseCase {
  constructor(private favoriteRecipeRepository: FavoriteRecipeRepository) {}
  async execute({
    createdBy,
  }: FetchMyFavoriteRecipesRequest): Promise<FetchMyFavoriteRecipesResponse> {
    const favoriteRecipes = await this.favoriteRecipeRepository.findManyByUserId(createdBy);

    return success({
      favoriteRecipes,
    });
  }
}
