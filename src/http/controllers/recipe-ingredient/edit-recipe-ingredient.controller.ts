import { Request, Response, NextFunction } from "express";
import { EditRecipeIngredientUseCase } from "../../../application/use-cases/recipe-ingredient/edit-recipe-ingredient";
import z from "zod";
import { MeasurementUnit } from "../../../core/enum/measurement-unit";

const requestParams = z.object({
  id: z.string(),
});

const editRecipeIngredientSchema = z.object({
  ingredient: z.string().min(1).optional(),
  amount: z.string().trim().min(1).optional(),
  unit: z
    .string()
    .transform((val) => val.toLocaleUpperCase())
    .pipe(z.nativeEnum(MeasurementUnit))
    .optional(),
});

export class EditRecipeIngredientController {
  constructor(private readonly editRecipeIngredientUseCase: EditRecipeIngredientUseCase) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = requestParams.parse(req.params);
      const body = editRecipeIngredientSchema.parse(req.body);

      const data = {
        id,
        updatedBy: userId,
        ...body,
      };

      const result = await this.editRecipeIngredientUseCase.execute(data);

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipeIngredient);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
