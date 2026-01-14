import { Request, Response, NextFunction } from "express";
import { CreateRecipeIngredientUseCase } from "../../../application/use-cases/recipe-ingredient/create-recipe-ingredient";
import z from "zod";

const requestParams = z.object({
    recipeId: z.string()
})

const createRecipeIngredientSchema = z.object({
    ingredient: z.string().min(1),
    amount: z.string().trim().min(1),
    unit: z.string().trim().min(1).max(5)
})

export class CreateRecipeIngredientController{
    constructor(private readonly createRecipeIngredientUseCase: CreateRecipeIngredientUseCase){}

    async handle(req: Request,res: Response,next: NextFunction){
        try {
            const userId = req.user.id

            const { recipeId } = requestParams.parse(req.params)
            const { ingredient, amount, unit } = createRecipeIngredientSchema.parse(req.body)

            const result = await this.createRecipeIngredientUseCase.execute({ingredient,amount,unit,recipeId, createdBy: userId})

            if(result.isError()){
                throw result.value
            }

            return res.status(201).json(result.value.recipeIngredient)

        } catch (error) {
            
        }
    }

}

