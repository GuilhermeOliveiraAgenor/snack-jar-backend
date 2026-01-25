import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchMyRecipeStepsUseCase } from "../../../application/use-cases/recipe-step/fetch-my-recipe-steps";
import { RecipeStepPresenter } from "../../presenters/recipe-step-presenter";

const requestParams = z.object({
  recipeId: z.string(),
});

const fetchMyRecipeStepQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchMyRecipeStepsController {
  constructor(private readonly fetchMyRecipeStepsUseCase: FetchMyRecipeStepsUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { recipeId } = requestParams.parse(req.params);
      const { page } = fetchMyRecipeStepQuerySchema.parse(req.query);

      const result = await this.fetchMyRecipeStepsUseCase.execute({ recipeId, userId, page });

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
