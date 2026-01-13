import { Request, Response, NextFunction } from "express"
import { JwtService } from "../../infra/auth/JwtService"
import { IJWTService } from "../../core/cryptography/IJwtService"

export function ensureAuthenticated(jwtService: IJWTService) {
    return (req: Request, res: Response, next: NextFunction) =>{
// variable receive header
const authHeader = req.headers.authorization

if(!authHeader){
    return res.status(401).json({message: "Unauthorized"}) 
}

// separate Bearer
const [, token] = authHeader.split(' ')

try {
    const jwtService = new JwtService()
    const { sub } = jwtService.verify(token)

    // set user id
    req.user = {
        id: sub
    }
    next()

} catch (error) {
    return res.status(401).json({message: "Invalid token"})
}
    }
}


