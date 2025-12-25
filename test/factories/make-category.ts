import { Category, CategoryProps } from "../../src/core/entities/category";
import { faker } from "@faker-js/faker";

export function makeCategory(override?: Partial<CategoryProps>) {
  return Category.create({
    name: faker.food.ethnicCategory(),
    description: faker.food.description(),
    ...override,
  });
}
