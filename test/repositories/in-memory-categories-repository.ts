import { categoriesRepository } from "../../src/application/repositories/categories-repository";
import { Category } from "../../src/core/entities/category";

export class InMemoryCategoriesRepository implements categoriesRepository {
  public items: Category[] = []; // array data

  async create(category: Category): Promise<void> {
    this.items.push(category);
  }
  async save(category: Category): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === category.id.toString());
    this.items[itemIndex] = category;
  }
  async findMany(): Promise<Category[]> {
    return this.items;
  }
  async findByName(name: string): Promise<Category | null> {
    const category = this.items.find((item) => item.name == name);
    if (!category) {
      return null;
    }
    return category;
  }
  async findById(id: string): Promise<Category | null> {
    const category = this.items.find((item) => item.id.toString() == id);
    if (!category) {
      return null;
    }
    return category;
  }
}
