import { Request, Response, NextFunction } from "express";
import z from "zod";
import { FetchRecipesByTitleUseCase } from "../../../application/use-cases/recipe/fetch-recipes-by-title";
import { RecipePresenter } from "../../presenters/recipe-presenter";

const fetchTitleSchema = z.object({
  title: z.string(),
});

export class FetchRecipesByTitleController {
  constructor(private readonly fetchRecipesByTitleUseCase: FetchRecipesByTitleUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { title } = fetchTitleSchema.parse(req.body);

      const result = await this.fetchRecipesByTitleUseCase.execute({ userId, title });

      if (result.isError()) {
        throw result.value;
      }

      return res
        .status(200)
        .json(RecipePresenter.toHTTPPaginated(result.value.recipes, result.value.meta));
    } catch (error) {
      next(error);
    }
  }
}
