import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { makeRecipeStep } from "../../../../test/factories/make-recipe-step";
import { DeleteRecipeStepUseCase } from "./delete-recipe-step";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";

let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: DeleteRecipeStepUseCase;

describe("Delete Recipe Step Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new DeleteRecipeStepUseCase(inMemoryRecipeStepRepository);
  });
  it("should be able to delete recipe step", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipeStep = makeRecipeStep({
      createdBy: user.id,
    });

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
    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: "0",
      deletedBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should be able to delete recipe step when user is not creator", async () => {
    const user1 = makeUser();
    const user2 = makeUser();

    await inMemoryUserRepository.create(user1);
    await inMemoryUserRepository.create(user2);

    const recipeStep = makeRecipeStep({
      createdBy: user1.id,
    });

    await inMemoryRecipeStepRepository.create(recipeStep);

    const result = await sut.execute({
      id: recipeStep.id.toString(),
      deletedBy: user2.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
