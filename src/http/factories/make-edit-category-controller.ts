import { EditCategoryUseCase } from "../../application/use-cases/category/edit-category";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaCategoryRepository } from "../../infra/repositories/prisma-category-repository";
import { EditCategoryController } from "../controllers/category/edit-category-controller";


export function makeEditCategoryController(){

    const prisma = getPrismaClient()

    const categoryRepository = new PrismaCategoryRepository(prisma)
    const editCategoryUseCase = new EditCategoryUseCase(categoryRepository)

    return new EditCategoryController(editCategoryUseCase)


}




