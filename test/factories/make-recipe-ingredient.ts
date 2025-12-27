import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "../../src/core/domain/value-objects/unique-entity-id";
import { RecipeIngredient, RecipeIngredientProps } from "../../src/core/entities/recipeIngredient";

export function makeRecipeIngredient(override?: Partial<RecipeIngredientProps>) {
  return RecipeIngredient.create({
    ingredient: faker.food.ingredient(),
    amount: faker.animal.bear(),
    unit: faker.animal.bird(),
    recipeId: new UniqueEntityID(),
    createdBy: new UniqueEntityID(),
    ...override,
  });
}
