import { Request, Response, NextFunction } from "express";
import { FetchCategoriesUseCase } from "../../../application/use-cases/category/fetch-categories";
import { FetchMyRecipesUseCase } from "../../../application/use-cases/recipe/fetch-my-recipes";

export class FetchMyRecipesController{
    constructor(private readonly fetchMyRecipesUseCase: FetchMyRecipesUseCase){}

    async handle(req: Request,res: Response,next: NextFunction){
        try {
            const userId = req.user.id

            const result = await this.fetchMyRecipesUseCase.execute({userId})

            if(result.isError()){
                throw result.value
            }

            return res.status(200).json(result.value.recipe)

        } catch (error) {
            next(error)
        }
    }
}

