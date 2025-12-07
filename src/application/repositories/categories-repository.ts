import { Category } from "../../core/entities/category";

export interface categoriesRepository {
  create(category: Category): Promise<void>;
  save(category: Category): Promise<void>;
  findMany(): Promise<Category[]>;
  findByName(description: string): Promise<Category | null>;
}
