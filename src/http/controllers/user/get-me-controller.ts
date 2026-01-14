import { NextFunction, Request, Response } from "express";
import { GetMeUseCase } from "../../../application/use-cases/user/get-me";

export class GetMeController {
  constructor(private readonly getMeUseCase: GetMeUseCase) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      console.log("Session" + req.user.id);

      const result = await this.getMeUseCase.execute({ userId });

      if (result.isError()) {
        throw result.value;
      }

      return res.status(200).json({ user: result.value.user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
