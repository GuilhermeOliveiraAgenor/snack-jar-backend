import process from "process"
import jwt from "jsonwebtoken"
import { IJWTService } from "./IJwtService"

export class JwtService implements IJWTService{
    sign(userId: string){
        console.log("JWT Function" + userId)

        return jwt.sign({
            sub: userId,
        },
        process.env.JWT_SECRET!,
        {expiresIn: '1d'}
    )
    }
    verify(token: string){
        return jwt.verify(token, process.env.JWT_SECRET!) as {
            sub: string
        }
    }
}






