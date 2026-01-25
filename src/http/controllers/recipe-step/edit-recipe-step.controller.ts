import { Request, Response, NextFunction } from "express";
import z from "zod";
import { EditRecipeStepUseCase } from "../../../application/use-cases/recipe-step/edit-recipe-step";
import { RecipeStepPresenter } from "../../presenters/recipe-step-presenter";

const requestParams = z.object({
  stepId: z.string(),
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
      const { stepId } = requestParams.parse(req.params);
      const body = editRecipeStepSchema.parse(req.body);

      const data = {
        id: stepId,
        userId,
        ...body,
      };

      const result = await this.editRecipeStepUseCase.execute(data);

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(RecipeStepPresenter.toHTTP(result.value.recipeStep));
    } catch (error) {
      next(error);
    }
  }
}
