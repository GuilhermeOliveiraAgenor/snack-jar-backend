import { Either, failure, success } from "../../../core/either";
import { FavoriteRecipe } from "../../../core/entities/favoriteRecipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";
import { UserRepository } from "../../repositories/user-repository";

interface FetchMyFavoriteRecipesRequest {
  createdBy: string;
}

type FetchMyFavoriteRecipesResponse = Either<
  NotFoundError,
  {
    favoriteRecipe: FavoriteRecipe[];
  }
>;

export class FetchMyFavoriteRecipesUseCase {
  constructor(
    private favoriteRecipeRepository: FavoriteRecipeRepository,
    private userRepository: UserRepository,
  ) {}
  async execute({
    createdBy,
  }: FetchMyFavoriteRecipesRequest): Promise<FetchMyFavoriteRecipesResponse> {
    const user = await this.userRepository.findById(createdBy);
    if (!user) {
      return failure(new NotFoundError("user"));
    }

    const favoriteRecipe = await this.favoriteRecipeRepository.findManyByUserId(user.id.toString());

    return success({
      favoriteRecipe,
    });
  }
}
