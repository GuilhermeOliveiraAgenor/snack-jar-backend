import { Request, Response, NextFunction } from "express";
import { BaseError } from "../../core/errors/base-error";
import { InternalServerError } from "../../application/errors/internal-server-error";


function normalizeError(err: unknown): BaseError{
    // if there is an error from BaseError
    if(err instanceof BaseError){
        return err
    }
    // default server error
    return new InternalServerError()
}

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
){
    if(res.headersSent){
        next(err)
    }
    
    const error = normalizeError(err)
    const statusCode = error.statusCode
    const body = error.getBody()

    return res.status(statusCode).json(body)

}



