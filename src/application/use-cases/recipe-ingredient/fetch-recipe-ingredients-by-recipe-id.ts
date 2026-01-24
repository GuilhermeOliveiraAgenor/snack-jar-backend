import { Either, failure, success } from "../../../core/either";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { PaginationMeta } from "../../../http/presenters/pagination.meta";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface FetchRecipeIngredientsByRecipeIdRequest {
  recipeId: string;
  page?: number;
  perPage?: number;
}

type FetchRecipeIngredientsByRecipeIdResponse = Either<
  NotFoundError,
  { recipeIngredients: RecipeIngredient[]; meta: PaginationMeta }
>;

export class FetchRecipeIngredientsByRecipeIdUseCase {
  constructor(
    private recipeIngredientRepository: RecipeIngredientRepository,
    private recipeRepository: RecipeRepository,
  ) {}
  async execute({
    recipeId,
    page = 1,
    perPage = 10,
  }: FetchRecipeIngredientsByRecipeIdRequest): Promise<FetchRecipeIngredientsByRecipeIdResponse> {
    // verify if exists recipe id
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    const result = await this.recipeIngredientRepository.findManyByRecipeId(
      recipe.id.toString(),
      page,
      perPage,
    );

    const meta: PaginationMeta = {
      page,
      per_page: perPage,
      total_count: result.totalCount,
      filters: {},
    };

    return success({
      recipeIngredients: result.recipeIngredients,
      meta,
    });
  }
}
