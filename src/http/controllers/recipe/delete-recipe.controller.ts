import { Request, Response, NextFunction } from "express";
import { DeleteRecipeUseCase } from "../../../application/use-cases/recipe/delete-recipe";
import z from "zod";

const requestParams = z.object({
  id: z.string(),
});

export class DeleteRecipeController {
  constructor(private readonly deleteRecipeUseCase: DeleteRecipeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { id } = requestParams.parse(req.params);

      const result = await this.deleteRecipeUseCase.execute({ id, userId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
