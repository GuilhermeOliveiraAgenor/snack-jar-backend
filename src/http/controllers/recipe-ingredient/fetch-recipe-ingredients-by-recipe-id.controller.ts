import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipeIngredientsByRecipeIdUseCase } from "../../../application/use-cases/recipe-ingredient/fetch-recipe-ingredients-by-recipe-id";
import { RecipeIngredientPresenter } from "../../presenters/recipe-ingredient-presenter";

const requestParams = z.object({
  recipeId: z.string(),
});

const fetchRecipeIngredientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchRecipeIngredientsByRecipeIdController {
  constructor(
    private readonly fetchRecipeIngredientsByIdUseCase: FetchRecipeIngredientsByRecipeIdUseCase,
  ) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipeId } = requestParams.parse(req.params);
      const { page } = fetchRecipeIngredientsQuerySchema.parse(req.query);

      const result = await this.fetchRecipeIngredientsByIdUseCase.execute({ recipeId, page });

      if (result.isError()) {
        throw result.value;
      }

      return res
        .status(200)
        .json(
          RecipeIngredientPresenter.toHTTPPaginated(
            result.value.recipeIngredients,
            result.value.meta,
          ),
        );
    } catch (error) {
      next(error);
    }
  }
}
