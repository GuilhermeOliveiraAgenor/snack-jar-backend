import { faker } from "@faker-js/faker";
import { Recipe, RecipeProps } from "../../src/core/entities/recipe";
import { UniqueEntityID } from "../../src/core/domain/value-objects/unique-entity-id";
import { RecipeStatus } from "../../src/core/enum/recipe-status";

export function makeRecipe(override?: Partial<RecipeProps>) {
  return Recipe.create({
    title: faker.internet.domainName(),
    description: faker.food.description(),
    preparationTime: 60,
    status: RecipeStatus.ACTIVE,
    categoryId: new UniqueEntityID(),
    createdBy: new UniqueEntityID(),
    ...override,
  });
}
