import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { EditRecipeUseCase } from "./edit-recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeRecipe } from "../../../../test/factories/make-recipe";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let sut: EditRecipeUseCase;

describe("Edit Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();

    sut = new EditRecipeUseCase(inMemoryRecipeRepository);
  });
  it("should be able to edit a recipe", async () => {
    // create recipe
    const recipe = makeRecipe();

    // pass to repository
    await inMemoryRecipeRepository.create(recipe);

    //pass to use case
    const result = await sut.execute({
      id: recipe.id.toString(),
      title: "Bolo de Chocolate",
      description: "Receita de bolo de chocolate",
      preparationTime: 50,
      updatedBy: "user-1",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipe).toMatchObject({
        title: "Bolo de Chocolate",
        description: "Receita de bolo de chocolate",
        preparationTime: 50,
      });
    }
  });

  it("should not be able to edit a recipe when id does not exist", async () => {
    const result = await sut.execute({
      id: "0",
      title: "Bolo de Cenoura",
      description: "Receita de bolo de cenoura",
      preparationTime: 60,
      updatedBy: "user-1",
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
