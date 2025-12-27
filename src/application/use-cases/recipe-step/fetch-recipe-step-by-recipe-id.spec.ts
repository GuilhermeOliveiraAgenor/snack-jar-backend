import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { DeleteRecipeStepUseCase } from "./delete-recipe-step";
import { makeRecipeStep } from "../../../../test/factories/make-recipe-step";
import { makeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: DeleteRecipeStepUseCase;

describe("Fetch Recipe Step By Recipe Id", () => {
  beforeEach(() => {
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new DeleteRecipeStepUseCase(inMemoryRecipeStepRepository);
  });
  it("should be able to fetch recipe step by recipe id", async () => {
    const user = makeUser();

    await inMemoryUserRepository.create(user);

    const recipeStep = makeRecipeStep();

    await inMemoryRecipeStepRepository.create(recipeStep);

    const result = await sut.execute({
      id: recipeStep.id.toString(),
      deletedBy: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(0);
  });
  it("should not be able to delete recipe step when id does not exists", async () => {
    const user = makeUser();

    const result = await sut.execute({
      id: "0",
      deletedBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
