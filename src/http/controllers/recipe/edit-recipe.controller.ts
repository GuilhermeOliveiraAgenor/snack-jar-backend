import z from "zod";
import { EditRecipeUseCase } from "../../../application/use-cases/recipe/edit-recipe";
import { Request, Response, NextFunction } from "express";
import { RecipePresenter } from "../../presenters/recipe-presenter";

const requestParams = z.object({
  id: z.string(),
});

const editRecipeSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  preparationTime: z.number().optional(),
});

export class EditRecipeController {
  constructor(private readonly editRecipeUseCase: EditRecipeUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = requestParams.parse(req.params);
      const body = editRecipeSchema.parse(req.body);

      const data = {
        id,
        userId,
        ...body,
      };

      const result = await this.editRecipeUseCase.execute(data);

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(RecipePresenter.toHTTP(result.value.recipe));
    } catch (error) {
      next(error);
    }
  }
}
