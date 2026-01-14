import { Request, Response, NextFunction } from "express";
import { EditRecipeIngredientUseCase } from "../../../application/use-cases/recipe-ingredient/edit-recipe-ingredient";
import { EditCategoryController } from "../category/edit-category-controller";
import z from "zod";

const requestParams = z.object({
    userId: z.string()
})

const editRecipeIngredientSchema = z.object({
    ingredient: z.string().min(1).optional(),
    amount: z.string().trim().min(1).optional(),
    unit: z.string().trim().min(1).max(5).optional()
})

export class EditRecipeIngredientController{
    constructor(private readonly editRecipeIngredientUseCase: EditRecipeIngredientUseCase){}
    async handle(req: Request,res: Response,next: NextFunction){
        try {
            const {userId} = requestParams.parse(req.params)
            const { ingredient,amount,unit} = editRecipeIngredientSchema.parse(req.body)

            const result = await this.editRecipeIngredientUseCase.execute({id, ingredient,amount,unit, updatedBy: userId})

        } catch (error) {
            next(error)
        }

    }
}

