import { ca, id } from "zod/v4/locales";
import { categoriesRepository } from "../../src/application/repositories/categories-repository";
import { Category } from "../../src/core/entities/category";

export class InMemoryCategoriesRepository implements categoriesRepository {
  public items: Category[] = []; // array data

  async create(category: Category): Promise<void> {
    this.items.push(category);
  }
  async save(category: Category): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === category.id);
    this.items[itemIndex] = category;
  }
  async findMany(): Promise<Category[]> {
    return this.items;
  }
  async findByName(description: string): Promise<Category | null> {
    
  }
}
