import { faker } from "@faker-js/faker/.";
import { RecipeStep, RecipeStepProps } from "../../src/core/entities/recipeStep";
import { UniqueEntityID } from "../../src/core/domain/value-objects/unique-entity-id";

export function makeRecipeStep(override?: Partial<RecipeStepProps>) {
  return RecipeStep.create({
    step: faker.number.int(),
    description: faker.food.description(),
    recipeId: new UniqueEntityID(),
    createdBy: new UniqueEntityID(),
    ...override,
  });
}
