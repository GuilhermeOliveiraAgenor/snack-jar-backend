import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { EditRecipeUseCase } from "./edit-recipe";
import { Recipe } from "../../../core/entities/recipe";
import { Category } from "../../../core/entities/category";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { RecipeStatus } from "../../../core/enum/enum-status";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: EditRecipeUseCase;

describe("Edit Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();

    sut = new EditRecipeUseCase(inMemoryRecipeRepository);
  });
  it("should edit a recipe", async () => {
    // create category
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    // create recipe
    const recipe = Recipe.create({
      title: "Bolo de Cenoura",
      description: "Receita de bolo de cenoura",
      preparationTime: 60,
      status: RecipeStatus.ACTIVE,
      categoryId: category.id,
      createdBy: new UniqueEntityID("user-1"),
    });

    // pass to repository
    await inMemoryRecipeRepository.create(recipe);

    //pass to use case
    const result = await sut.execute({
      recipeId: recipe.id.toString(),
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

  it("should not edit recipe with recipeId does not exists", async () => {
    const category = Category.create({
      name: "Doces",
      description: "Pratos doces",
    });

    await inMemoryCategoriesRepository.create(category);

    const result = await sut.execute({
      recipeId: "0",
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
