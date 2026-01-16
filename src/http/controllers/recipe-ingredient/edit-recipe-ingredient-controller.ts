import { Request, Response, NextFunction } from "express";
import { EditRecipeIngredientUseCase } from "../../../application/use-cases/recipe-ingredient/edit-recipe-ingredient";
import z from "zod";

const requestParams = z.object({
  id: z.string(),
});

const editRecipeIngredientSchema = z.object({
  ingredient: z.string().min(1).optional(),
  amount: z.string().trim().min(1).optional(),
  unit: z.string().trim().min(1).max(5).optional(),
});

export class EditRecipeIngredientController {
  constructor(private readonly editRecipeIngredientUseCase: EditRecipeIngredientUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = requestParams.parse(req.params);
      const { ingredient, amount, unit } = editRecipeIngredientSchema.parse(req.body);

      const data: {
        id: string;
        updatedBy: string;
        ingredient?: string;
        amount?: string;
        unit?: string;
      } = {
        id,
        updatedBy: userId,
      };

      const result = await this.editRecipeIngredientUseCase.execute(data);

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeIngredient);
    } catch (error) {
      next(error);
    }
  }
}
