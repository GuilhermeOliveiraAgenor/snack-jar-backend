import { Request, Response, NextFunction } from "express";
import { FetchMyFavoriteRecipesUseCase } from "../../../application/use-cases/favorite-recipe/fetch-my-favorite-recipes";
import z from "zod";
import { FavoriteRecipePresenter } from "../../presenters/favorite-recipe-presenter";

const fetchFavoriteRecipesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchMyFavoriteRecipesController {
  constructor(private readonly fetchMyFavoriteRecipesUseCase: FetchMyFavoriteRecipesUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { page } = fetchFavoriteRecipesQuerySchema.parse(req.query);

      const result = await this.fetchMyFavoriteRecipesUseCase.execute({ createdBy: userId, page });

      if (result.isError()) {
        throw result.value;
      }

      return res
        .status(200)
        .json(
          FavoriteRecipePresenter.toHTTPPaginated(result.value.favoriteRecipes, result.value.meta),
        );
    } catch (error) {
      next(error);
    }
  }
}
