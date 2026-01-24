import { Request, Response, NextFunction } from "express";
import { FetchCategoriesUseCase } from "../../../application/use-cases/category/fetch-categories";
import { CategoryPresenter } from "../../presenters/category-presenter";
import z from "zod";

export const fetchCategoriesParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
});

export class FetchCategoriesController {
  constructor(private readonly fetchCategoriesUseCase: FetchCategoriesUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { page } = fetchCategoriesParamsSchema.parse(req.query);

      const result = await this.fetchCategoriesUseCase.execute({ page });

      if (result.isError()) {
        throw result.value;
      }

      return res
        .status(200)
        .json(CategoryPresenter.toHTTPPaginated(result.value.categories, result.value.meta));
    } catch (error) {
      next(error);
    }
  }
}
