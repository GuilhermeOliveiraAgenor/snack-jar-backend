import { NextFunction, Request, Response } from "express";
import z from "zod";
import { GetMeUseCase } from "../../../application/use-cases/user/get-me";

const paramsSchema = z.object({
  id: z.string(),
});

export class GetMeController {
  constructor(private readonly getMeUseCase: GetMeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = paramsSchema.parse(req.params);

      const result = await this.getMeUseCase.execute({ id });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ user: result.value.user });
    } catch (error) {
      next(error);
    }
  }
}
