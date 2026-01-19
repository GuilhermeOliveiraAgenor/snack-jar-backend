import { Request, Response, NextFunction } from "express";
import { FetchCategoriesUseCase } from "../../../application/use-cases/category/fetch-categories";

export class FetchCategoriesController {
  constructor(private readonly fetchCategoriesUseCase: FetchCategoriesUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.fetchCategoriesUseCase.execute();

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ category: result.value.categories });
    } catch (error) {
      next(error);
    }
  }
}
