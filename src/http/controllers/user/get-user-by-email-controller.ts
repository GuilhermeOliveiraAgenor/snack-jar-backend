import { NextFunction, Request, Response } from "express";
import z from "zod";
import { GetUserByIdUseCase } from "../../../application/use-cases/user/get-user-by-id";

const paramsSchema = z.object({
    id: z.string(),
})


export class GetUserByIdController{
    constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase){}

    async handle(req: Request, res: Response, next: NextFunction){

        try {
            const { id } = paramsSchema.parse(req.params)

            const result  = await this.getUserByIdUseCase.execute({id})

            if(result.isError()){
                throw result.value
            }

            return res.status(200).json({user: result.value.user})


        } catch (error) {
            next(error)
        }

    }
}


