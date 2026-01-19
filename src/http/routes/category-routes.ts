import { Router } from "express";
import { makeCreateCategoryController } from "../factories/make-create-category.controller";
import { makeEditCategoryController } from "../factories/make-edit-category.controller";
import { makeFetchCategoriesController } from "../factories/make-fetch-categories.controller";

// instance router
const categoryRoutes = Router();

categoryRoutes.post("/categories", (req, res, next) => {
  return makeCreateCategoryController().handle(req, res, next);
});

categoryRoutes.put("/categories/:id", (req, res, next) => {
  return makeEditCategoryController().handle(req, res, next);
});

categoryRoutes.get("/categories", (req, res, next) => {
  return makeFetchCategoriesController().handle(req, res, next);
});

export { categoryRoutes };
