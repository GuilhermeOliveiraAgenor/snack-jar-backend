import { Either, failure, success } from "../../../core/either";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";

interface DeleteRecipeIngredientUseCaseRequest {
  id: string;
}

type DeleteRecipeIngredientUseCaseResponse = Either<NotFoundError, null>;

export class DeleteRecipeIngredientUseCase {
  constructor(private recipeIngredient: RecipeIngredientRepository) {}
  async execute({
    id,
  }: DeleteRecipeIngredientUseCaseRequest): Promise<DeleteRecipeIngredientUseCaseResponse> {
    // verify if recipe ingredient id exists
    const recipeIngredient = await this.recipeIngredient.findById(id);
    if (!recipeIngredient) {
      return failure(new NotFoundError("recipe-ingredient"));
    }

    await this.recipeIngredient.delete(recipeIngredient);

    return success(null);
  }
}
