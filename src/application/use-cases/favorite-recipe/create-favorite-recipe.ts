import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { FavoriteRecipe } from "../../../core/entities/favoriteRecipe";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FavoriteRecipeRepository } from "../../repositories/favorite-recipe-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface CreateFavoriteRecipeUseCaseRequest {
  recipeId: string;
  createdBy: string;
}

type CreateFavoriteRecipeUseCaseResponse = Either<
  AlreadyExistsError | NotFoundError,
  {
    favoriteRecipe: FavoriteRecipe;
  }
>;

export class CreateFavoriteRecipeUseCase {
  constructor(
    private favoriteRecipeRepository: FavoriteRecipeRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    recipeId,
    createdBy,
  }: CreateFavoriteRecipeUseCaseRequest): Promise<CreateFavoriteRecipeUseCaseResponse> {
    // verify if recipe id exists
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe.createdBy.toString() != createdBy) {
      return failure(new NotAllowedError("user"));
    }

    // verify if favorite recipe already exists
    const favoriteRecipes = await this.favoriteRecipeRepository.findManyByUserId(createdBy);
    const alreadyExists = favoriteRecipes.some(
      (favorite) =>
        favorite.recipeId.toString() === recipeId && favorite.createdBy.toString() === createdBy,
    );
    if (alreadyExists) {
      return failure(new AlreadyExistsError("favoriteRecipe"));
    }

    const favoriteRecipe = FavoriteRecipe.create({
      recipeId: new UniqueEntityID(recipeId),
      createdBy: new UniqueEntityID(createdBy),
    });

    await this.favoriteRecipeRepository.create(favoriteRecipe);

    return success({
      favoriteRecipe,
    });
  }
}
