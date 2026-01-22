import { Request, Response, NextFunction } from "express";
import z from "zod";
import { GetDetailsByRecipeIdUseCase } from "../../../application/use-cases/recipe/get-details-by-recipe-id";

const getDetailsSchema = z.object({
  recipeId: z.string(),
});

export class GetDetailsByRecipeIdController {
  constructor(private readonly getDetailsByRecipeId: GetDetailsByRecipeIdUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipeId } = getDetailsSchema.parse(req.body);

      const result = await this.getDetailsByRecipeId.execute({ recipeId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.ingredients);
    } catch (error) {
      next(error);
    }
  }
}
