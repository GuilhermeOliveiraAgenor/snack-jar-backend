import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { DeleteRecipeIngredientUseCase } from "./delete-recipe-ingredient";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let sut: DeleteRecipeIngredientUseCase;

describe("Delete Recipe Ingredient", () => {
  beforeEach(() => {
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    sut = new DeleteRecipeIngredientUseCase(inMemoryRecipeIngredientRepository);
  });
  it("should delete a recipe ingredient", async () => {
    const recipeIngredient = makeRecipeIngredient();

    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({ id: recipeIngredient.id.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(0);
  });
  it("should not edit recipe ingredient when id does not exists", async () => {
    const result = await sut.execute({
      id: "0",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
