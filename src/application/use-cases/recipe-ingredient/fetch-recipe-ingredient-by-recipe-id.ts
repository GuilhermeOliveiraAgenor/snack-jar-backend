import { Either, failure, success } from "../../../core/either";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface FetchRecipeIngredientByRecipeIdRequest {
  id: string;
}

type FetchRecipeIngredientByRecipeIdResponse = Either<
  NotFoundError,
  { recipeIngredients: RecipeIngredient[] }
>;

export class FetchRecipeIngredientByRecipeIdUseCase {
  constructor(
    private recipeIngredientRepository: RecipeIngredientRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    id,
  }: FetchRecipeIngredientByRecipeIdRequest): Promise<FetchRecipeIngredientByRecipeIdResponse> {
    // verify if exists recipe id
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    const recipeIngredients = await this.recipeIngredientRepository.findManyByRecipeId(id);

    return success({
      recipeIngredients,
    });
  }
}
