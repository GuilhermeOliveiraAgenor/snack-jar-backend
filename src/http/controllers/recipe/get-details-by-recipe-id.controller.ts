import { Request, Response, NextFunction } from "express";
import z from "zod";
import { GetDetailsByRecipeIdUseCase } from "../../../application/use-cases/recipe/get-details-by-recipe-id";
import { RecipeDetailsPresenter } from "../../presenters/recipe-details-presenter";

const requestParams = z.object({
  recipeId: z.string(),
});

export class GetDetailsByRecipeIdController {
  constructor(private readonly getDetailsByRecipeId: GetDetailsByRecipeIdUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipeId } = requestParams.parse(req.params);

      const result = await this.getDetailsByRecipeId.execute({ recipeId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(RecipeDetailsPresenter.toHTTP(result.value));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
