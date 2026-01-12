import { Router } from "express";
import { makeCreateCategoryController } from "../factories/make-create-category-controller";
import { makeEditCategoryController } from "../factories/make-edit-category-controller";
import { makeFetchCategoryController } from "../factories/make-fetch-category-controller";

// instance router
const categoryRoutes = Router();

categoryRoutes.post("/categories", (req, res, next) => {
  return makeCreateCategoryController().handle(req, res, next);
});

categoryRoutes.put("/categories", (req,res,next) => {
  return makeEditCategoryController().handle(req,res,next)
})

categoryRoutes.get("/categories", (req,res,next) => {
  return makeFetchCategoryController().handle(req,res,next)
})

export { categoryRoutes };
