import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipeStepByRecipeIdUseCase } from "../../../application/use-cases/recipe-step/fetch-recipe-step-by-recipe-id";

const requestParams = z.object({
  id: z.string(),
});

export class FetchRecipeStepByRecipeIdController {
  constructor(private readonly fetchRecipeStepByIdUseCase: FetchRecipeStepByRecipeIdUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = requestParams.parse(req.params);

      const result = await this.fetchRecipeStepByIdUseCase.execute({ id });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeStep);
    } catch (error) {
      next(error);
    }
  }
}
