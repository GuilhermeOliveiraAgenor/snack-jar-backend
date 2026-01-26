import { Category } from "../../core/entities/category";

export interface CategoryRepository {
  create(category: Category): Promise<void>;
  save(category: Category): Promise<void>;
  findMany(page: number, perPage: number): Promise<{ categories: Category[]; totalCount: number }>;
  findByName(name: string): Promise<Category | null>;
  findById(id: string): Promise<Category | null>;
}
