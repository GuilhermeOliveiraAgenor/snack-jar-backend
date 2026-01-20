import { Either, failure, success } from "../../../core/either";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface DeleteRecipeIngredientUseCaseRequest {
  id: string;
  deletedBy: string;
}

type DeleteRecipeIngredientUseCaseResponse = Either<NotFoundError | NotAllowedError, null>;

export class DeleteRecipeIngredientUseCase {
  constructor(
    private recipeIngredientRepository: RecipeIngredientRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    id,
    deletedBy,
  }: DeleteRecipeIngredientUseCaseRequest): Promise<DeleteRecipeIngredientUseCaseResponse> {
    // verify if recipe ingredient id exists
    const recipeIngredient = await this.recipeIngredientRepository.findById(id);
    if (!recipeIngredient) {
      return failure(new NotFoundError("recipeIngredient"));
    }

    if (recipeIngredient.createdBy.toString() != deletedBy) {
      return failure(new NotAllowedError("user"));
    }

    const recipe = await this.recipeRepository.findById(recipeIngredient.recipeId.toString());

    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe?.status.toString() !== "ACTIVE") {
      return failure(new NotAllowedError("recipe"));
    }

    await this.recipeIngredientRepository.delete(recipeIngredient);

    return success(null);
  }
}
