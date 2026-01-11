import express from "express";
import { categoryRoutes } from "./http/routes/category-route";

export const app = express();

app.use(express.json())


app.use(categoryRoutes)

app.use(bas)

