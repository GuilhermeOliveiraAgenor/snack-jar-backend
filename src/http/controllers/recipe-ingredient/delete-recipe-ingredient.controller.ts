import { Request, Response, NextFunction } from "express";
import z from "zod";
import { DeleteRecipeIngredientUseCase } from "../../../application/use-cases/recipe-ingredient/delete-recipe-ingredient";

const requestParams = z.object({
  ingredientId: z.string(),
});

export class DeleteRecipeIngredientController {
  constructor(private readonly deleteRecipeIngredientUseCase: DeleteRecipeIngredientUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { ingredientId } = requestParams.parse(req.params);

      const result = await this.deleteRecipeIngredientUseCase.execute({ id: ingredientId, deletedBy: userId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ message: "Ingredient deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
