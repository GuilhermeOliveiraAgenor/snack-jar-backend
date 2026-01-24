import { Request, Response, NextFunction } from "express";
import { FetchMyFavoriteRecipesUseCase } from "../../../application/use-cases/favorite-recipe/fetch-my-favorite-recipes";
import z from "zod";

const fetchFavoriteRecipesQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchMyFavoriteRecipesController {
  constructor(private readonly fetchMyFavoriteRecipesUseCase: FetchMyFavoriteRecipesUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { page } = fetchFavoriteRecipesQuery.parse(req.query);

      const result = await this.fetchMyFavoriteRecipesUseCase.execute({ createdBy: userId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.favoriteRecipes);
    } catch (error) {
      next(error);
    }
  }
}
