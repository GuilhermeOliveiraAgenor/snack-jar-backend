import { Either, failure, success } from "../../../core/either";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface DeleteRecipeRequest {
  id: string;
}

type DeleteRecipeResponse = Either<NotFoundError, null>;

export class DeleteRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({ id }: DeleteRecipeRequest): Promise<DeleteRecipeResponse> {
    // verify if exists recipe
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    // inactive recipe
    recipe.inactivate();

    await this.recipeRepository.save(recipe);

    return success(null);
  }
}
