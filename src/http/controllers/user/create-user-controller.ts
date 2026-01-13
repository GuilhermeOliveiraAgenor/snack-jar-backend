import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/use-cases/user/create-user";
import z, { email } from "zod";
import { a } from "vitest/dist/chunks/suite.d.BJWk38HB";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().min(10),
    password: z.string().min(5)
})

export class CreateUserController{
    constructor(private readonly createUserUseCase: CreateUserUseCase){}

    async handle(req: Request, res:Response, next:NextFunction){
        try {
            const { name, email, password } = createUserSchema.parse(req.body)

            const result = await this.createUserUseCase.execute({name,email,password})

            if(result.isError()){
                throw result.value
            }
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

}
