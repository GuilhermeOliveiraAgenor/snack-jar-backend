import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FetchRecipeIngredientsByRecipeIdUseCase } from "./fetch-recipe-ingredient-by-recipe-id";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryRecipeRepository: InMemoryRecipeRepository;

let sut: FetchRecipeIngredientsByRecipeIdUseCase;

describe("Fetch Recipe Ingredients By Recipe Id", () => {
  beforeEach(() => {
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryRecipeRepository = new InMemoryRecipeRepository();

    sut = new FetchRecipeIngredientsByRecipeIdUseCase(
      inMemoryRecipeIngredientRepository,
      inMemoryRecipeRepository,
    );
  });

  it("should be able to fetch recipe ingredients by recipe id", async () => {
    const recipe = makeRecipe();

    await inMemoryRecipeRepository.create(recipe);

    const recipeIngredient = makeRecipeIngredient({ recipeId: recipe.id, ingredient: "Açucar" });

    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({ id: recipe.id.toString() });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.recipeIngredient[0]).toMatchObject({
        ingredient: "Açucar",
      });
      expect(
        inMemoryRecipeIngredientRepository.items.every(
          (recipeIngredient) => recipeIngredient.recipeId === recipe.id,
        ),
      ).toBe(true);
    }
  });
  it("should not be able to fetch recipe ingredientes when recipe id does not exists", async () => {
    const result = await sut.execute({ id: "0" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
