import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchMyRecipeIngredientsUseCase } from "../../../application/use-cases/recipe-ingredient/fetch-my-recipe-ingredients";
import { RecipeIngredientPresenter } from "../../presenters/recipe-ingredient-presenter";

const requestParams = z.object({
  recipeId: z.string(),
});

const fetchMyRecipeIngredientsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchMyRecipeIngredientsController {
  constructor(private readonly fetchMyRecipeIngredientsUseCase: FetchMyRecipeIngredientsUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { recipeId } = requestParams.parse(req.params);
      const { page } = fetchMyRecipeIngredientsQuerySchema.parse(req.query);

      const result = await this.fetchMyRecipeIngredientsUseCase.execute({
        recipeId,
        userId,
        page,
      });

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
