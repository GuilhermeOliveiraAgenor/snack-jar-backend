import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";

interface DeleteRecipeIngredientUseCaseRequest {
  id: string;
  deletedBy: string;
}

type DeleteRecipeIngredientUseCaseResponse = Either<NotFoundError | NotAllowedError, null>;

export class DeleteRecipeIngredientUseCase {
  constructor(private recipeIngredient: RecipeIngredientRepository) {}
  async execute({
    id,
    deletedBy,
  }: DeleteRecipeIngredientUseCaseRequest): Promise<DeleteRecipeIngredientUseCaseResponse> {
    // verify if recipe ingredient id exists
    const recipeIngredient = await this.recipeIngredient.findById(id);
    if (!recipeIngredient) {
      return failure(new NotFoundError("recipeIngredient"));
    }

    if (recipeIngredient.createdBy.toString() != deletedBy) {
      return failure(new NotAllowedError("user"));
    }

    await this.recipeIngredient.delete(recipeIngredient);

    return success(null);
  }
}
