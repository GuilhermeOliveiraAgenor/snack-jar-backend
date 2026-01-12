import { NextFunction, Response, Request } from "express";
import { EditCategoryUseCase } from "../../application/use-cases/category/edit-category";
import { z } from "zod"

const paramsSchema = z.object({
    id: z.string(),
})

const editCategorySchema = z.object({
    name: z.string(),
    description: z.string().optional()
})

export class EditCategoryController{
    constructor(private readonly editCategoryUseCase: EditCategoryUseCase){}
    
    async handle(req: Request, res: Response, next: NextFunction){
        try {
            
            const { id } = paramsSchema.parse(req.params)
            const { name, description } = editCategorySchema.parse(req.body)

            const result = await this.editCategoryUseCase.execute({id, name, description})

            if(result.isError()){
                throw result.value
            }
        
        return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}





