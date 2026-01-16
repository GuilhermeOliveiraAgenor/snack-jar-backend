import { Request, Response, NextFunction } from "express";
import { FetchRecipeByTitleUseCase } from "../../../application/use-cases/recipe/fetch-recipe-by-title";
import { title } from "process";
import z from "zod";

const fetchRecipeTitle = z.object({
    title: z.string()
})

export class FetchMyRecipesController{
    constructor(private readonly fetchRecipeByTitleUseCase: FetchRecipeByTitleUseCase){}

    async handle(req: Request,res: Response,next: NextFunction){
        try {
            const userId = req.user.id
            const { title } = fetchRecipeTitle.parse(req.body)

            const result = await this.fetchRecipeByTitleUseCase.execute({userId, title})

            if(result.isError()){
                throw result.value
            }

            return res.status(200).json(result.value.recipe)

        } catch (error) {
            next(error)
        }
    }
}

