import { Either, failure, success } from "../../../core/either";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";

interface EditRecipeIngredientUseCaseRequest {
  id: string;
  ingredient: RecipeIngredient["ingredient"];
  amount: RecipeIngredient["amount"];
  unit: RecipeIngredient["unit"];
}

type EditRecipeIngredientUseCaseResponse = Either<
  NotFoundError,
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
  }: EditRecipeIngredientUseCaseRequest): Promise<EditRecipeIngredientUseCaseResponse> {
    // verify if recipe exists

    const recipeIngredient = await this.recipeIngredientRepository.findById(id);

    if (!recipeIngredient) {
      return failure(new NotFoundError("recipe-ingredient"));
    }

    recipeIngredient.ingredient = ingredient ?? recipeIngredient.ingredient;
    recipeIngredient.amount = amount ?? recipeIngredient.amount;
    recipeIngredient.unit = unit ?? recipeIngredient.unit;

    await this.recipeIngredientRepository.save(recipeIngredient);

    return success({
      recipeIngredient,
    });
  }
}
