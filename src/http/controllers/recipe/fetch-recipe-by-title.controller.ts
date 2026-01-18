import { Request, Response, NextFunction } from "express";
import z from "zod";
import { GetRecipeByTitleUseCase } from "../../../application/use-cases/recipe/get-recipe-by-title";

const getRecipeTitle = z.object({
  title: z.string(),
});

export class GetRecipeByTitleController {
  constructor(private readonly getRecipeByTitleUseCase: GetRecipeByTitleUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { title } = getRecipeTitle.parse(req.body);

      const result = await this.getRecipeByTitleUseCase.execute({ userId, title });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(result.value.recipes);
    } catch (error) {
      next(error);
    }
  }
}
