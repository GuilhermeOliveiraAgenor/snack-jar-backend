import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { FavoriteRecipe } from "../../../core/entities/favoriteRecipe";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { UserRepository } from "../../repositories/user-repository";

interface CreateFavoriteRecipeUseCaseRequest {
  recipeId: string;
  userId: string;
}

type CreateFavoriteRecipeUseCaseResponse = Either<
  AlreadyExistsError,
  {
    favoriteRecipe: FavoriteRecipe;
  }
>;

export class CreateFavoriteRecipeUseCase {
  constructor(
    private favoriteRecipeRepository: FavoriteRecipeRepository,
    private recipeRepository: RecipeRepository,
    private userRepository: UserRepository,
  ) {}
  async execute({
    recipeId,
    userId,
  }: CreateFavoriteRecipeUseCaseRequest): Promise<CreateFavoriteRecipeUseCaseResponse> {
    // verify if recipe id exists
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    // verify if user id exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return failure(new NotFoundError("user"));
    }

    const favoriteRecipe = FavoriteRecipe.create({
      recipeId: new UniqueEntityID(recipeId),
      userId: new UniqueEntityID(userId),
    });

    await this.favoriteRecipeRepository.create(favoriteRecipe);

    return success({
      favoriteRecipe,
    });
  }
}
