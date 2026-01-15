import { FetchCategoriesUseCase } from "../../application/use-cases/category/fetch-categories";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaCategoryRepository } from "../../infra/repositories/prisma-category-repository";
import { FetchCategoryController } from "../controllers/category/fetch-category-controller";

export function makeFetchCategoryController() {
  const prisma = getPrismaClient();

  const categoryRepository = new PrismaCategoryRepository(prisma);
  const fetchCategoryUseCase = new FetchCategoriesUseCase(categoryRepository);

  return new FetchCategoryController(fetchCategoryUseCase);
}
