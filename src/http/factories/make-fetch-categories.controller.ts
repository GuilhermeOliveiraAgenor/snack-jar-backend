import { FetchCategoriesUseCase } from "../../application/use-cases/category/fetch-categories";
import { getPrismaClient } from "../../infra/prisma/client";
import { PrismaCategoryRepository } from "../../infra/repositories/prisma-category-repository";
import { FetchCategoriesController } from "../controllers/category/fetch-categories.controller";

export function makeFetchCategoriesController() {
  const prisma = getPrismaClient();

  const categoryRepository = new PrismaCategoryRepository(prisma);
  const fetchCategoryUseCase = new FetchCategoriesUseCase(categoryRepository);

  return new FetchCategoriesController(fetchCategoryUseCase);
}
