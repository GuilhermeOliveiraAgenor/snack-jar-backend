import { Request, Response, NextFunction } from "express"
import { JwtService } from "../../core/cryptography/JwtService"

export function ensureAuthenticated{
    req: Request,
    res: Response,
    next: NextFunction
} {
    // variable receive header
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({message: "User Not Authenticated"}) 
    }

    // separate Bearer
    const [, token] = authHeader.split(' ')

    try {
        const jwtService = new JwtService()
        const { sub } = jwtService.verify(token)

        req.user.id = sub
        next()

    } catch (error) {
        return res.status(401).json({message: "Invalid token"})
    }

}


