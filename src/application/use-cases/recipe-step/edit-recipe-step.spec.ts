import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { EditRecipeStepUseCase } from "./edit-recipe-step";
import { makeRecipeStep } from "../../../../test/factories/make-recipe-step";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let sut: EditRecipeStepUseCase;

describe("Edit Recipe Step Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    sut = new EditRecipeStepUseCase(inMemoryRecipeStepRepository);
  });
  it("should be able to edit a recipe step", async () => {
    const recipeStep = makeRecipeStep();

    await inMemoryRecipeStepRepository.create(recipeStep);

    const result = await sut.execute({
      id: recipeStep.id.toString(),
      step: 1,
      description: "Jogue a açucar na bandeja",
      updatedBy: "user-1",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipeStep).toMatchObject({
        step: 1,
        description: "Jogue a açucar na bandeja",
      });
    }
  });
  it("should not be edit recipe step when id does not exists", async () => {
    const result = await sut.execute({
      id: "0",
      step: 1,
      description: "Jogue a farinha na bandeja",
      updatedBy: "user-1",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
