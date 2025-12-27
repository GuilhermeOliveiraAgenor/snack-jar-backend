import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { CreateRecipeStepUseCase } from "./create-recipe-step";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { makeUser } from "../../../../test/factories/make-user";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let inMemoryRecipeRepository: InMemoryRecipeRepository;
let sut: CreateRecipeStepUseCase;

describe("Create Recipe Step Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    sut = new CreateRecipeStepUseCase(inMemoryRecipeStepRepository, inMemoryRecipeRepository);
  });
  it("should be able to create a recipe step", async () => {
    const user = makeUser();

    const recipe = makeRecipe();

    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({
      recipeId: recipe.id.toString(),
      step: 1,
      description: "Jogue o açucar na bandeja",
      createdBy: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipeStep).toMatchObject({
        step: 1,
        description: "Jogue o açucar na bandeja",
      });
    }
  });
  it("should not be able to create recipe step when recipe id does not exists", async () => {
    const user = makeUser();

    const result = await sut.execute({
      recipeId: "0",
      step: 1,
      description: "Jogue a farinha na bandeja",
      createdBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
