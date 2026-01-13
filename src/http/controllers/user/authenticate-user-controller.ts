import { Request, Response, NextFunction } from "express";
import { AuthenticateUserUseCase } from "../../../application/use-cases/user/authenticate-user";
import { JwtService } from "../../../core/cryptography/JwtService";
import { z } from "zod";

const authenticateSchema = z.object({
    email: z.string().min(10),
    password: z.string()
})

export class AuthenticateUserController{
    constructor(
         private readonly authenticateUseCase: AuthenticateUserUseCase,
         private readonly jwtService: JwtService
        ){}
    
    async handle(req: Request ,res: Response, next: NextFunction){
        try {
           
            const { email, password } = authenticateSchema.parse(req.body)

            const result = await this.authenticateUseCase.execute({email,password})

            if(result.isError()){
                throw result.value
            }

            const { userId } = result.value

            // sign user in jwt
            const token = this.jwtService.sign(userId)

            return res.status(200).json({userId,token})

        } catch (error) {
            console.log(error)
            next(error)
        }
    }

}

