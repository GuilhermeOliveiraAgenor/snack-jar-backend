import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeCategory } from "../../../../test/factories/make-category";
import { makeUser } from "../../../../test/factories/make-user";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { FetchRecipeByTitleUseCase } from "./fetch-recipe-by-title";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

let sut: FetchRecipeByTitleUseCase;

describe("Fetch Recipe By Title Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchRecipeByTitleUseCase(inMemoryRecipeRepository, inMemoryUserRepository);
  });

  it("should be able to fetch recipes by title", async () => {
    const user = makeUser();

    await inMemoryUserRepository.create(user);

    const recipe1 = makeRecipe({
      title: "Bolo de chocolate",
      createdBy: user.id,
    });

    const recipe2 = makeRecipe({
      createdBy: user.id,
    });

    await inMemoryRecipeRepository.create(recipe1);
    await inMemoryRecipeRepository.create(recipe2);

    const result = await sut.execute({ userId: user.id.toString(), title: "Bolo de chocolate" });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(2);
    expect(inMemoryRecipeRepository.items.length).toBeGreaterThan(1);
    if (result.isSuccess()) {
      expect(
        // list each item and verify id
        inMemoryRecipeRepository.items.every(
          (recipe) => recipe.createdBy?.toString() === user.id.toString(),
        ),
      ).toBe(true);
      expect(inMemoryRecipeRepository.items[0]).toMatchObject({
        title: "Bolo de chocolate",
      });
    }
  });

  it("should not be able to fetch recipes when userId does not exist", async () => {
    const category = makeCategory();
    await inMemoryCategoriesRepository.create(category);

    const recipe1 = makeRecipe();
    await inMemoryRecipeRepository.create(recipe1);

    const result = await sut.execute({ userId: "0", title: "0" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
