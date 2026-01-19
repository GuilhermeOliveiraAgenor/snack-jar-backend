import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface FetchRecipesByTitleUseCaseRequest {
  userId: string;
  title: string;
}

type FetchRecipesByTitleUseCaseResponse = Either<
  NotFoundError,
  {
    recipes: Recipe[];
  }
>;

export class FetchRecipesByTitleUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    userId,
    title,
  }: FetchRecipesByTitleUseCaseRequest): Promise<FetchRecipesByTitleUseCaseResponse> {
    const recipes = await this.recipeRepository.findManyByTitle(userId, title);
    if (recipes.length <= 0) {
      return failure(new NotFoundError("recipe"));
    }

    return success({
      recipes,
    });
  }
}
