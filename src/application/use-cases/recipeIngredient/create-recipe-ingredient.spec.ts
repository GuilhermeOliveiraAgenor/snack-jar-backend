import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { CreateRecipeIngredientUseCase } from "./create-recipe-ingredient";
import { Category } from "../../../core/entities/category";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { Recipe } from "../../../core/entities/recipe";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { RecipeStatus } from "../../../core/enum/enum-status";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

let sut: CreateRecipeIngredientUseCase;

describe("Create Recipe Ingredient Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();

    sut = new CreateRecipeIngredientUseCase(
      inMemoryRecipeIngredientRepository,
      inMemoryRecipeRepository,
    );
  });
  it("should create a recipe ingredient", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    const recipe = Recipe.create({
      title: "Bolo de Laranja",
      description: "Receita de bolo de laranja",
      preparationTime: 60,
      status: RecipeStatus.ACTIVE,
      categoryId: category.id,
      createdBy: new UniqueEntityID("user-1"),
    });

    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({
      ingredient: "Açucar",
      amount: "1",
      unit: "Kg",
      recipeId: recipe.id.toString(),
      createdBy: "user-1",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipeIngredient).toMatchObject({
        ingredient: "Açucar",
        amount: "1",
        unit: "Kg",
      });
    }
  });
  it("should not create a recipe ingredient when recipeId does not exist", async () => {
    const result = await sut.execute({
      ingredient: "Açucar",
      amount: "1",
      unit: "Kg",
      recipeId: "0",
      createdBy: "user-1",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(0);
  });
});
