import { Request, Response, NextFunction } from "express";
import { CreateFavoriteRecipeUseCase } from "../../../application/use-cases/favorite-recipe/create-favorite-recipe";
import z from "zod";

const createFavoriteRecipeSchema = z.object({
  recipeId: z.string(),
});

export class CreateFavoriteRecipeController {
  constructor(private readonly createFavoriteRecipeUseCase: CreateFavoriteRecipeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;

      const { recipeId } = createFavoriteRecipeSchema.parse(req.body);

      const result = await this.createFavoriteRecipeUseCase.execute({
        recipeId,
        createdBy: userId,
      });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(201).json(result.value.favoriteRecipe);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
