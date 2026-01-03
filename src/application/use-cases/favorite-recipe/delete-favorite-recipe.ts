import { Either, failure, success } from "../../../core/either";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";

interface DeleteFavoriteRecipeUseCaseRequest {
  id: string;
}

type DeleteFavoriteRecipeUseCaseResponse = Either<NotFoundError, null>;

export class DeleteFavoriteRecipeUseCase {
  constructor(private favoriteRecipeRepository: FavoriteRecipeRepository) {}

  async execute({
    id,
  }: DeleteFavoriteRecipeUseCaseRequest): Promise<DeleteFavoriteRecipeUseCaseResponse> {
    const favoriteRecipe = await this.favoriteRecipeRepository.findById(id);
    if (!favoriteRecipe) {
      return failure(new NotFoundError("recipe"));
    }

    await this.favoriteRecipeRepository.delete(favoriteRecipe);

    return success(null);
  }
}
