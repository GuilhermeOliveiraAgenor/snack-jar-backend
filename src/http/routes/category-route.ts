import { Router } from "express";
import { makeCreateCategoryController } from "../factories/make-create-category-controller";

// instance router
const categoryRoutes = Router();

categoryRoutes.post("/categories", (req, res, next) => {
  return makeCreateCategoryController().handle(req, res, next);
});

export { categoryRoutes };
