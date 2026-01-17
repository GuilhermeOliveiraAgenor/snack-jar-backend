import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { UserRepository } from "../../repositories/user-repository";

interface FetchRecipeByTitleUseCaseRequest {
  userId: string;
  title: string;
}

type FetchRecipeByTitleUseCaseResponse = Either<
  NotFoundError,
  {
    recipes: Recipe[];
  }
>;

export class FetchRecipeByTitleUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    title,
  }: FetchRecipeByTitleUseCaseRequest): Promise<FetchRecipeByTitleUseCaseResponse> {
    // verify if user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return failure(new NotFoundError("user"));
    }

    const recipes = await this.recipeRepository.findManyByTitle(userId, title);

    return success({
      recipes,
    });
  }
}
