import { Request, Response, NextFunction } from "express";
import { DeleteFavoriteRecipeUseCase } from "../../../application/use-cases/favorite-recipe/delete-favorite-recipe";
import z from "zod";
import { DeleteRecipeIngredientUseCase } from "../../../application/use-cases/recipe-ingredient/delete-recipe-ingredient";

const requestParams = z.object({
    id: z.string()
})

export class DeleteRecipeIngredientController{
    constructor(private readonly deleteRecipeIngredientUseCase: DeleteRecipeIngredientUseCase){}

    async handle(req: Request,res: Response,next: NextFunction){
        try {
            const userId = req.user.id
            const {id} = requestParams.parse(req.params) 

            const result = await this.deleteRecipeIngredientUseCase.execute({id, deletedBy: userId})

            if(result.isSuccess()){
                throw result.value
            }

            return res.status(200).json({message: "Ingredient deleted successfully"})

        } catch (error) {
            next(error)
        }
    }

}

