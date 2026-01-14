import { Request, Response, NextFunction } from "express";
import { FetchMyFavoriteRecipesUseCase } from "../../../application/use-cases/favorite-recipe/fetch-my-favorite-recipes";

export class FetchMyFavoriteRecipesController{
    constructor(private readonly fetchMyFavoriteRecipesUseCase: FetchMyFavoriteRecipesUseCase){}

    async handle(req: Request,res: Response,next: NextFunction){
        try {
            const userId = req.user.id

            const result = await this.fetchMyFavoriteRecipesUseCase.execute({userId})

            if(result.isError()){
                throw result.value
            }

            return res.status(200).json(result.value.recipe)

        } catch (error) {
            next(error)
        }
    }
}

