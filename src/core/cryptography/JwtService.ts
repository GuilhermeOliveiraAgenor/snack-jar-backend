import process from "process"
import jwt from "jsonwebtoken"

export class JwtService{
    sign(userId: string){
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






