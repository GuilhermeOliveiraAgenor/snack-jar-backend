import { Router } from "express";
import { makeCreateUserController } from "../factories/make-create-user";
import { makeAuthenticateUserController } from "../factories/make-authenticate-controller";


const userRoutes = Router()

userRoutes.post("/user", (req,res,next) => {
    return makeCreateUserController().handle(req,res,next)
})

userRoutes.post("/auth", (req,res,next) => {
    return makeAuthenticateUserController().handle(req,res,next)
})

export { userRoutes }


