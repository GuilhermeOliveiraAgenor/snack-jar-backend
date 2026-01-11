import { NextFunction } from "express";
import { BaseError } from "../../core/errors/base-error";


function normalizeError(err: unknown): BaseError{
    // if there is an error from BaseError
    if(err instanceof BaseError){
        return err
    }
    // default server error
    return new InternalServerError(err)
}

export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
){
    if(res.headers){
        next(err)
    }
    
    const error = normalizeError(err)
    const statusCode = error.errorCode
    const body = error.getBody()

    return res.status(statusCode).json(body)

}



