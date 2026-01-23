import z from "zod";
import { CreateCategoryUseCase } from "../../../application/use-cases/category/create-category";
import { NextFunction, Request, Response } from "express";
import { CategoryPresenter } from "../../presenters/category-presenter";

// fields validate zod
const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export class CreateCategoryController {
  // instance use case
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      // fields json
      const { name, description } = createCategorySchema.parse(req.body);

      // use case
      const result = await this.createCategoryUseCase.execute({ name, description });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(CategoryPresenter.toResponse(result.value.category, 201));
    } catch (error) {
      next(error);
    }
  }
}
