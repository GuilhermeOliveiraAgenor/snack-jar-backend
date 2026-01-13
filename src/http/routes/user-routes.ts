import { Router } from "express";
import { makeCreateUserController } from "../factories/make-create-user";


const userRoutes = Router()

userRoutes.post("/user", (req,res,next) => {
    return makeCreateUserController().handle(req,res,next)
})

export { userRoutes }


