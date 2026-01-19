import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { EditRecipeIngredientUseCase } from "./edit-recipe-ingredient";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { MeasurementUnit } from "../../../core/enum/measurement-unit";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: EditRecipeIngredientUseCase;

describe("Edit Recipe Ingredient", () => {
  beforeEach(() => {
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new EditRecipeIngredientUseCase(inMemoryRecipeIngredientRepository);
  });
  it("should be able edit a recipe ingredient", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipeIngredient = makeRecipeIngredient({
      createdBy: user.id,
    });
    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      id: recipeIngredient.id.toString(),
      ingredient: "Farinha",
      amount: "1000",
      unit: MeasurementUnit.G,
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
    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: "0",
      ingredient: "Farinha",
      amount: "1000",
      unit: MeasurementUnit.KG,
      updatedBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should not be able edit a recipe ingredient when user is not a creator", async () => {
    const user1 = makeUser();
    await inMemoryUserRepository.create(user1);
    const user2 = makeUser();
    await inMemoryUserRepository.create(user2);

    const recipeIngredient = makeRecipeIngredient({
      createdBy: user1.id,
    });

    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      id: recipeIngredient.id.toString(),
      ingredient: "Farinha",
      amount: "1000",
      unit: MeasurementUnit.KG,
      updatedBy: user2.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
