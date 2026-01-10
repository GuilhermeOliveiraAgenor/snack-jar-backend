import z from "zod";
import { CreateCategoryUseCase } from "../../application/use-cases/category/create-category";
import { NextFunction, Request, Response } from "express";

// fields validate zod
const createCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export class CreateCategoryController {
  // instance use case
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      // fields json
      const { name, description } = createCategorySchema.parse(req.body);

      // use case
      const category = await this.createCategoryUseCase.execute({ name, description });

      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
}
