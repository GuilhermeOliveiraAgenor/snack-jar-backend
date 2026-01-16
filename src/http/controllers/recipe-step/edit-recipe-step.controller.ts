import { Request, Response, NextFunction } from "express";
import z from "zod";
import { EditRecipeStepUseCase } from "../../../application/use-cases/recipe-step/edit-recipe-step";

const requestParams = z.object({
  id: z.string(),
});

const editRecipeStepSchema = z.object({
    step: z.number().min(1).optional(),
    description: z.string().trim().min(1).optional(),
});

export class EditRecipeStepController {
  constructor(private readonly editRecipeStepUseCase: EditRecipeStepUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = requestParams.parse(req.params);
      const { step, description } = editRecipeStepSchema.parse(req.body);

      const data: {
        id: string;
        updatedBy: string;
        step?: number;
        description?: string;
      } = {
        id,
        updatedBy: userId,
      };

      const result = await this.editRecipeStepUseCase.execute(data);

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeStep);
    } catch (error) {
      next(error);
    }
  }
}
