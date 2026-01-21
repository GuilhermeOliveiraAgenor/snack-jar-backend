import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { UserRepository } from "../../repositories/user-repository";

interface FetchMyRecipesUseCaseRequest {
  userId: string;
}

type FetchMyRecipesUseCaseResponse = Either<
  NotFoundError,
  {
    recipes: Recipe[];
  }
>;
export class FetchMyRecipesUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({ userId }: FetchMyRecipesUseCaseRequest): Promise<FetchMyRecipesUseCaseResponse> {
    // verify if user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return failure(new NotFoundError("user"));
    }

    const recipes = await this.recipeRepository.findManyByUserId(user.id.toString());

    return success({
      recipes,
    });
  }
}
