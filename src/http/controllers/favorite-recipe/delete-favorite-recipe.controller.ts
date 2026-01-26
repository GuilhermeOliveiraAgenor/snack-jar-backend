import { Request, Response, NextFunction } from "express";
import { DeleteFavoriteRecipeUseCase } from "../../../application/use-cases/favorite-recipe/delete-favorite-recipe";
import z from "zod";

const deleteSchemaBody = z.object({
  id: z.string(),
});

export class DeleteFavoriteRecipeController {
  constructor(private readonly deleteFavoriteRecipeUseCase: DeleteFavoriteRecipeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { id } = deleteSchemaBody.parse(req.body);

      const result = await this.deleteFavoriteRecipeUseCase.execute({ id, userId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ message: "Recipe deleted successufully" });
    } catch (error) {
      next(error);
    }
  }
}
