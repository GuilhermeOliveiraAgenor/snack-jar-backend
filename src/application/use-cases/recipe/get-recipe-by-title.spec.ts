import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { makeUser } from "../../../../test/factories/make-user";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { GetRecipeByTitleUseCase } from "./get-recipe-by-title";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: GetRecipeByTitleUseCase;

describe("Get Recipe By Title Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetRecipeByTitleUseCase(inMemoryRecipeRepository);
  });

  it("should be able to get recipes by title", async () => {
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
  it("should not be able to get recipes by title when title does not exists", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipe = makeRecipe({
      title: "Bolo de Chocolate",
      createdBy: user.id,
    });

    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({ userId: user.id.toString(), title: "Bolo de Laranja" });
    console.log(result);

    expect(result.isError()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
