import { Request, Response, NextFunction } from "express";
import z from "zod";
import { CreateRecipeStepUseCase } from "../../../application/use-cases/recipe-step/create-recipe-step";

const requestParams = z.object({
  recipeId: z.string(),
});

const createRecipeStepSchema = z.object({
  step: z.number().min(1),
  description: z.string().trim().min(1),
});

export class CreateRecipeStepController {
  constructor(private readonly createRecipeStepUseCase: CreateRecipeStepUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { recipeId } = requestParams.parse(req.params);
      const { step, description } = createRecipeStepSchema.parse(req.body);

      const result = await this.createRecipeStepUseCase.execute({
        step,
        description,
        recipeId,
        createdBy: userId,
      });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(201).json(result.value.recipeStep);
    } catch (error) {
      next(error);
    }
  }
}
