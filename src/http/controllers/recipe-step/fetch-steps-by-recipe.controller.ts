import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchStepsByRecipeUseCase } from "../../../application/use-cases/recipe-step/fetch-steps-by-recipe";
import { RecipeStepPresenter } from "../../presenters/recipe-step-presenter";

const requestParams = z.object({
  recipeId: z.string(),
});

const fetchRecipeStepQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchStepsByRecipeController {
  constructor(private readonly fetchStepsByRecipeUseCase: FetchStepsByRecipeUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { recipeId } = requestParams.parse(req.params);
      const { page } = fetchRecipeStepQuerySchema.parse(req.query);

      const result = await this.fetchStepsByRecipeUseCase.execute({
        recipeId,
        userId,
        page,
      });

      if (result.isError()) {
        throw result.value;
      }

      return res
        .status(200)
        .json(RecipeStepPresenter.toHTTPPaginated(result.value.recipeSteps, result.value.meta));
    } catch (error) {
      next(error);
    }
  }
}
