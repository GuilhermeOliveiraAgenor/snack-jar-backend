import express from "express";
import { categoryRoutes } from "./http/routes/category-route";
import { errorHandler } from "./http/middleware/error-handler";

export const app = express();

app.use(express.json());

app.use(categoryRoutes);

app.use(errorHandler);
