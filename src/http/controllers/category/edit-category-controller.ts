import { NextFunction, Response, Request } from "express";
import { EditCategoryUseCase } from "../../../application/use-cases/category/edit-category";
import { z } from "zod"

// zod validation id
const paramsSchema = z.object({
    id: z.string(),
})
// zod validation body
const editCategorySchema = z.object({
    name: z.string(),
    description: z.string()
})

export class EditCategoryController{
    constructor(private readonly editCategoryUseCase: EditCategoryUseCase){}
    
    async handle(req: Request, res: Response, next: NextFunction){
        try {
            // params and fields json
            const { id } = paramsSchema.parse(req.params)
            const { name, description } = editCategorySchema.parse(req.body)

            const result = await this.editCategoryUseCase.execute({name,description, id})

            if(result.isError()){
                throw result.value
            }
        
        return res.status(200).json({category: result.value.category})
        } catch (error) {
            next(error)
        }
    }

}





