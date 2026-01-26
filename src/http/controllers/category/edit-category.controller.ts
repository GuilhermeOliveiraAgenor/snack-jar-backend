import { NextFunction, Response, Request } from "express";
import { EditCategoryUseCase } from "../../../application/use-cases/category/edit-category";
import { z } from "zod";
import { CategoryPresenter } from "../../presenters/category-presenter";

// zod validation id
const paramsSchema = z.object({
  id: z.string(),
});
// zod validation body
const editCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
});

export class EditCategoryController {
  constructor(private readonly editCategoryUseCase: EditCategoryUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      // params and fields json
      const { id } = paramsSchema.parse(req.params);
      const body = editCategorySchema.parse(req.body);

      const data = {
        id,
        ...body,
      };

      const result = await this.editCategoryUseCase.execute(data);

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json(CategoryPresenter.toHTTP(result.value.category));
    } catch (error) {
      next(error);
    }
  }
}
