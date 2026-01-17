import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";

interface EditRecipeIngredientUseCaseRequest {
  id: string;
  ingredient?: RecipeIngredient["ingredient"] | undefined;
  amount?: RecipeIngredient["amount"] | undefined;
  unit?: RecipeIngredient["unit"] | undefined;
  updatedBy: string;
}

type EditRecipeIngredientUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    recipeIngredient: RecipeIngredient;
  }
>;

export class EditRecipeIngredientUseCase {
  constructor(private recipeIngredientRepository: RecipeIngredientRepository) {}

  async execute({
    id,
    ingredient,
    amount,
    unit,
    updatedBy,
  }: EditRecipeIngredientUseCaseRequest): Promise<EditRecipeIngredientUseCaseResponse> {
    // verify if recipe exists

    const recipeIngredient = await this.recipeIngredientRepository.findById(id);

    if (!recipeIngredient) {
      return failure(new NotFoundError("recipe-ingredient"));
    }

    if (recipeIngredient.createdBy.toString() != updatedBy) {
      return failure(new NotAllowedError("user"));
    }

    recipeIngredient.ingredient = ingredient ?? recipeIngredient.ingredient;
    recipeIngredient.amount = amount ?? recipeIngredient.amount;
    recipeIngredient.unit = unit ?? recipeIngredient.unit;
    recipeIngredient.updatedBy = new UniqueEntityID(updatedBy);

    await this.recipeIngredientRepository.save(recipeIngredient);

    return success({
      recipeIngredient,
    });
  }
}
