import { Either } from "../../../core/either";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";

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
  constructor(
    private recipeIngredientRepository: RecipeIngredientRepository,
  ) {}

  async execute({
    id,
    ingredient,
    amount,
    unit,
  }: EditRecipeIngredientUseCaseRequest): Promise<EditRecipeIngredientUseCaseResponse> {

    const recipe = await this.recipeIngredientRepository.findManyByRecipeId


  }
}
