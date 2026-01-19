import { Either, failure, success } from "../../../core/either";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";

interface DeleteFavoriteRecipeUseCaseRequest {
  id: string;
  deletedBy: string;
}

type DeleteFavoriteRecipeUseCaseResponse = Either<NotFoundError | NotAllowedError, null>;

export class DeleteFavoriteRecipeUseCase {
  constructor(private favoriteRecipeRepository: FavoriteRecipeRepository) {}

  async execute({
    id,
    deletedBy,
  }: DeleteFavoriteRecipeUseCaseRequest): Promise<DeleteFavoriteRecipeUseCaseResponse> {
    const favoriteRecipe = await this.favoriteRecipeRepository.findById(id);
    if (!favoriteRecipe) {
      return failure(new NotFoundError("favoriteRecipe"));
    }

    if (favoriteRecipe.createdBy.toString() !== deletedBy) {
      return failure(new NotAllowedError("user"));
    }

    await this.favoriteRecipeRepository.delete(favoriteRecipe);

    return success(null);
  }
}
