import { NextFunction, Request, Response } from "express";
import { CreateRecipeUseCase } from "../../../application/use-cases/recipe/create-recipe";
import z from "zod";
import { MeasurementUnit } from "../../../core/enum/measurement-unit";

const createRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  preparationTime: z.number(),
  categoryId: z.string(),

  recipeIngredient: z.array(
    z.object({
      ingredient: z.string().min(1),
      amount: z.string().min(1),
      unit: z
        .string()
        .transform((val) => val.toLocaleUpperCase())
        .pipe(z.nativeEnum(MeasurementUnit)),
    }),
  ),

  recipeStep: z.array(
    z.object({
      step: z.number(),
      description: z.string().min(1),
    }),
  ),
});

export class CreateRecipeController {
  constructor(private readonly createRecipeUseCase: CreateRecipeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { title, description, preparationTime, categoryId, recipeIngredient, recipeStep } =
        createRecipeSchema.parse(req.body);

      const result = await this.createRecipeUseCase.execute({
        title,
        description,
        preparationTime,
        categoryId,
        recipeIngredient,
        recipeStep,
        userId,
      });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(201).json(result.value.recipe);
    } catch (error) {
      next(error);
    }
  }
}
