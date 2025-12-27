import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { EditRecipeIngredientUseCase } from "./edit-recipe-ingredient";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let sut: EditRecipeIngredientUseCase;

describe("Edit Recipe Ingredient", () => {
  beforeEach(() => {
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    sut = new EditRecipeIngredientUseCase(inMemoryRecipeIngredientRepository);
  });
  it("should be able edit a recipe ingredient", async () => {
    const user = makeUser();

    const recipeIngredient = makeRecipeIngredient();

    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      id: recipeIngredient.id.toString(),
      ingredient: "Farinha",
      amount: "1000",
      unit: "G",
      updatedBy: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipeIngredient).toMatchObject({
        ingredient: "Farinha",
        amount: "1000",
        unit: "G",
      });
    }
  });
  it("should not be able to edit recipe ingredient when id does not exists", async () => {
    const user = makeUser();

    const result = await sut.execute({
      id: "0",
      ingredient: "Farinha",
      amount: "1000",
      unit: "G",
      updatedBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
