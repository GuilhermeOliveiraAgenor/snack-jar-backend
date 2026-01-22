import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipeIngredientsByRecipeIdUseCase } from "../../../application/use-cases/recipe-ingredient/fetch-recipe-ingredients-by-recipe-id";

const requestParams = z.object({
  recipeId: z.string(),
});

export class FetchRecipeIngredientsByRecipeIdController {
  constructor(
    private readonly fetchRecipeIngredientsByIdUseCase: FetchRecipeIngredientsByRecipeIdUseCase,
  ) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipeId } = requestParams.parse(req.params);

      const result = await this.fetchRecipeIngredientsByIdUseCase.execute({ recipeId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeIngredients);
    } catch (error) {
      next(error);
    }
  }
}
