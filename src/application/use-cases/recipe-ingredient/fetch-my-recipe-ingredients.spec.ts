import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FetchMyRecipeIngredientsUseCase } from "./fetch-my-recipe-ingredients";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { makeUser } from "../../../../test/factories/make-user";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { NotAllowedError } from "../../errors/not-allowed-error";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryRecipeRepository: InMemoryRecipeRepository;

let sut: FetchMyRecipeIngredientsUseCase;

describe("Fetch My Recipe Ingredient By Recipe Id", () => {
  beforeEach(() => {
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new FetchMyRecipeIngredientsUseCase(
      inMemoryRecipeIngredientRepository,
      inMemoryRecipeRepository,
    );
  });

  it("should be able to fetch recipe ingredient by recipe id", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipe = makeRecipe({
      createdBy: user.id,
    });
    await inMemoryRecipeRepository.create(recipe);

    const recipeIngredient = makeRecipeIngredient({ recipeId: recipe.id, ingredient: "Açucar" });
    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      recipeId: recipe.id.toString(),
      userId: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.recipeIngredients[0]).toMatchObject({
        ingredient: "Açucar",
      });
      expect(
        inMemoryRecipeIngredientRepository.items.every(
          (recipeIngredient) => recipeIngredient.recipeId === recipe.id,
        ),
      ).toBe(true);
    }
  });
  it("should not be able to fetch recipe ingredient when recipe id does not exists", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const result = await sut.execute({ recipeId: "0", userId: user.id.toString() });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should not be able to fetch recipe ingredient when user is not creator", async () => {
    const user1 = makeUser();
    await inMemoryUserRepository.create(user1);

    const user2 = makeUser();
    await inMemoryUserRepository.create(user2);

    const recipe = makeRecipe({
      createdBy: user1.id,
    });
    await inMemoryRecipeRepository.create(recipe);

    const recipeIngredient = makeRecipeIngredient({
      createdBy: user1.id,
    });
    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      recipeId: recipe.id.toString(),
      userId: user2.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
