import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipeStepsByRecipeIdUseCase } from "../../../application/use-cases/recipe-step/fetch-recipe-steps-by-recipe-id";

const requestParams = z.object({
  id: z.string(),
});

export class FetchRecipeStepsByRecipeIdController {
  constructor(private readonly fetchRecipeStepsByIdUseCase: FetchRecipeStepsByRecipeIdUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = requestParams.parse(req.params);

      const result = await this.fetchRecipeStepsByIdUseCase.execute({ id });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeSteps);
    } catch (error) {
      next(error);
    }
  }
}
