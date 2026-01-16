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
  { recipeIngredient: RecipeIngredient[] }
>;

export class FetchRecipeIngredientByRecipeIdUseCase {
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

    const recipeIngredient = await this.recipeIngredientRepository.findManyByRecipeId(
      recipe.id.toString(),
    );

    return success({
      recipeIngredient,
    });
  }
}
