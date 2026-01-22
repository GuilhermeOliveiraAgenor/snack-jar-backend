import { Request, Response, NextFunction } from "express";
import z from "zod";
import { GetDetailsByRecipeIdUseCase } from "../../../application/use-cases/recipe/get-details-by-recipe-id";

const requestParams = z.object({
  id: z.string(),
});

export class GetDetailsByRecipeIdController {
  constructor(private readonly getDetailsByRecipeId: GetDetailsByRecipeIdUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = requestParams.parse(req.params);

      const result = await this.getDetailsByRecipeId.execute({ recipeId: id });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value);
    } catch (error) {
      next(error);
    }
  }
}
