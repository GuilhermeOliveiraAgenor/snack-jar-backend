import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { FetchMyRecipesUseCase } from "./fetch-my-recipes";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeCategory } from "../../../../test/factories/make-category";
import { makeUser } from "../../../../test/factories/make-user";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { InMemoryCategoryRepository } from "../../../../test/repositories/in-memory-category-repository";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryCategoryRepository: InMemoryCategoryRepository;

let sut: FetchMyRecipesUseCase;

describe("Fetch My Recipes Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FetchMyRecipesUseCase(inMemoryRecipeRepository, inMemoryUserRepository);
  });

  it("should be able to fetch my recipes", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipe1 = makeRecipe({
      createdBy: user.id,
    });

    const recipe2 = makeRecipe({
      createdBy: user.id,
    });

    await inMemoryRecipeRepository.create(recipe1);
    await inMemoryRecipeRepository.create(recipe2);

    const result = await sut.execute({ userId: user.id.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(2);
    expect(inMemoryRecipeRepository.items.length).toBeGreaterThan(1);
    if (result.isSuccess()) {
      expect(
        // list each item and verify id
        inMemoryRecipeRepository.items.every(
          (recipe) => recipe.createdBy.toString() === user.id.toString(),
        ),
      ).toBe(true);
    }
  });

  it("should not be able to fetch recipes when userId does not exist", async () => {
    const category = makeCategory();
    await inMemoryCategoryRepository.create(category);

    const recipe = makeRecipe();
    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({ userId: "0" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
