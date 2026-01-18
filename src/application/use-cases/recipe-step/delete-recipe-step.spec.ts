import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { makeRecipeStep } from "../../../../test/factories/make-recipe-step";
import { DeleteRecipeStepUseCase } from "./delete-recipe-step";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let sut: DeleteRecipeStepUseCase;

describe("Delete Recipe Step Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    sut = new DeleteRecipeStepUseCase(inMemoryRecipeStepRepository);
  });
  it("should be able to delete recipe step", async () => {
    const recipeStep = makeRecipeStep();

    await inMemoryRecipeStepRepository.create(recipeStep);

    const result = await sut.execute({
      id: recipeStep.id.toString(),
      deletedBy: "user-1",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(0);
  });
  it("should not be able to delete recipe step when id does not exists", async () => {
    const result = await sut.execute({
      id: "0",
      deletedBy: "user-1",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
