import { CreateCategoryUseCase } from "../../application/use-cases/category/create-category";
import { prisma } from "../../infra/prisma/client";
import { PrismaCategoryRepository } from "../../infra/repositories/prisma-category-repository";
import { CreateCategoryController } from "../controllers/create-user-controller";

export function makeCreateCategoryController(){
    // create use case
    const categoryRepository = new PrismaCategoryRepository(prisma);
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

    return new CreateCategoryController(createCategoryUseCase)

}


