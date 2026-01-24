import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipeStepsByRecipeIdUseCase } from "../../../application/use-cases/recipe-step/fetch-recipe-steps-by-recipe-id";
import { RecipeStepPresenter } from "../../presenters/recipe-step-presenter";

const requestParams = z.object({
  recipeId: z.string(),
});

const fetchRecipeStepQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchRecipeStepsByRecipeIdController {
  constructor(private readonly fetchRecipeStepsByIdUseCase: FetchRecipeStepsByRecipeIdUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipeId } = requestParams.parse(req.params);
      const { page } = fetchRecipeStepQuerySchema.parse(req.query);

      const result = await this.fetchRecipeStepsByIdUseCase.execute({ recipeId, page });

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
