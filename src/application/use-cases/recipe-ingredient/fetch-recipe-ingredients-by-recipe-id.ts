import { Either, failure, success } from "../../../core/either";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface FetchRecipeIngredientsByRecipeIdRequest {
  id: string;
}

type FetchRecipeIngredientsByRecipeIdResponse = Either<
  NotFoundError,
  { recipeIngredients: RecipeIngredient[] }
>;

export class FetchRecipeIngredientsByRecipeIdUseCase {
  constructor(
    private recipeIngredientRepository: RecipeIngredientRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    id,
  }: FetchRecipeIngredientsByRecipeIdRequest): Promise<FetchRecipeIngredientsByRecipeIdResponse> {
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
