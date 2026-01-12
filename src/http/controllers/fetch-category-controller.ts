import { Request, Response, NextFunction } from "express";
import { FetchCategoriesUseCase } from "../../application/use-cases/category/fetch-categories";

export class FetchCategoryController{
    constructor( private readonly fetchCategoryUseCase: FetchCategoriesUseCase){}

    async handle(req: Request, res: Response, next: NextFunction){
       
        try {
            const result = await this.fetchCategoryUseCase.execute()

            if(result.isError()){
                throw result.value
            }
    
            return res.status(200).json({result})
        } catch (error) {
            next(error)
        }

    }
}


