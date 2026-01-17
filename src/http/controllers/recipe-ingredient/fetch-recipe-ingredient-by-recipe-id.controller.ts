import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipeIngredientByRecipeIdUseCase } from "../../../application/use-cases/recipe-ingredient/fetch-recipe-ingredient-by-recipe-id";

const requestParams = z.object({
  id: z.string(),
});

export class FetchRecipeIngredientByRecipeIdController {
  constructor(
    private readonly fetchRecipeIngredientByIdUseCase: FetchRecipeIngredientByRecipeIdUseCase,
  ) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = requestParams.parse(req.params);

      const result = await this.fetchRecipeIngredientByIdUseCase.execute({ id });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeIngredient);
    } catch (error) {
      next(error);
    }
  }
}
