import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { DeleteRecipeUseCase } from "./delete-recipe";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { RecipeStatus } from "../../../core/enum/enum-status";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeCategory } from "../../../../test/factories/make-category";
import { makeRecipe } from "../../../../test/factories/make-recipe";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: DeleteRecipeUseCase;

describe("Soft delete Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new DeleteRecipeUseCase(inMemoryRecipeRepository);
  });

  it("should soft delete a recipe", async () => {
    const category = makeCategory();

    await inMemoryCategoriesRepository.create(category);

    const recipe = makeRecipe();

    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({ id: recipe.id.toString(), deletedBy: "user-1" });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.recipe).toMatchObject({
        status: RecipeStatus.INACTIVE,
        deletedBy: new UniqueEntityID("user-1"),
      });
    }
  });
  it("should not delete a recipe when recipeId does not exist", async () => {
    const result = await sut.execute({ id: "0", deletedBy: "user-1" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
