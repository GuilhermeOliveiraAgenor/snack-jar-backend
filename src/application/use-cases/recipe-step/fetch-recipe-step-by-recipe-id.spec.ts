import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { makeRecipeStep } from "../../../../test/factories/make-recipe-step";
import { makeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { FetchRecipeStepByRecipeIdUseCase } from "./fetch-recipe-step-by-recipe-id";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { makeRecipe } from "../../../../test/factories/make-recipe";

let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryRecipeRepository: InMemoryRecipeRepository;

let sut: FetchRecipeStepByRecipeIdUseCase;

describe("Fetch Recipe Step By Recipe Id", () => {
  beforeEach(() => {
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new FetchRecipeStepByRecipeIdUseCase(
      inMemoryRecipeStepRepository,
      inMemoryRecipeRepository,
    );
  });
  it("should be able to fetch recipe step by recipe id", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipe = makeRecipe();
    await inMemoryRecipeRepository.create(recipe);

    const recipeStep = makeRecipeStep();
    await inMemoryRecipeStepRepository.create(recipeStep);

    const result = await sut.execute({
      id: recipe.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(1);
  });
  it("should not be able to fetch recipe step when id does not exists", async () => {
    const result = await sut.execute({
      id: "0",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
