import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface GetRecipeByTitleUseCaseRequest {
  userId: string;
  title: string;
}

type GetRecipeByTitleUseCaseResponse = Either<
  NotFoundError,
  {
    recipes: Recipe[];
  }
>;

export class GetRecipeByTitleUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({
    userId,
    title,
  }: GetRecipeByTitleUseCaseRequest): Promise<GetRecipeByTitleUseCaseResponse> {
    const recipes = await this.recipeRepository.findManyByTitle(userId, title);
    if (recipes.length <= 0) {
      return failure(new NotFoundError("recipe"));
    }

    return success({
      recipes,
    });
  }
}
