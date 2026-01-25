import { Request, Response, NextFunction } from "express";
import z from "zod";
import { DeleteRecipeStepUseCase } from "../../../application/use-cases/recipe-step/delete-recipe-step";

const requestParams = z.object({
  stepId: z.string(),
});

export class DeleteRecipeStepController {
  constructor(private readonly deleteRecipeStepUseCase: DeleteRecipeStepUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { stepId } = requestParams.parse(req.params);

      const result = await this.deleteRecipeStepUseCase.execute({ id: stepId, userId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ message: "Step deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
