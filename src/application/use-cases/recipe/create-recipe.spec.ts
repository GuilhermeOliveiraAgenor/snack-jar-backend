import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { CreateRecipeUseCase } from "./create-recipe";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { Category } from "../../../core/entities/category";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeNullError } from "../../errors/recipe-null-error";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: CreateRecipeUseCase;

describe("Create Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new CreateRecipeUseCase(
      inMemoryRecipeRepository,
      inMemoryRecipeIngredientRepository,
      inMemoryRecipeStepRepository,
      inMemoryCategoriesRepository,
    );
  });

  it("should create a recipe", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    const result = await sut.execute({
      title: "Bolo de Cenoura",
      description: "Receita de bolo de cenoura",
      preparationTime: 60,
      categoryId: category.id.toString(),
      createdBy: "user-1",

      recipeIngredient: [
        {
          ingredient: "Açucar",
          amount: "1",
          unit: "Kg",
        },
        {
          ingredient: "Farinha",
          amount: "1",
          unit: "Kg",
        },
      ],

      recipeStep: [
        {
          step: 1,
          description: "Jogue o açucar em um pote",
        },
        {
          step: 2,
          description: "Jogue a farinha em um pote",
        },
      ],
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(2);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(2);
    if (result.isSuccess()) {
      expect(result.value.recipe).toMatchObject({
        title: "Bolo de Cenoura",
        description: "Receita de bolo de cenoura",
      });
    }

    expect(inMemoryRecipeIngredientRepository.items).toMatchObject([
      {
        ingredient: "Açucar",
        amount: "1",
        unit: "Kg",
      },
      {
        ingredient: "Farinha",
        amount: "1",
        unit: "Kg",
      },
    ]);
    expect(inMemoryRecipeStepRepository.items).toMatchObject([
      {
        step: 1,
        description: "Jogue o açucar em um pote",
      },
      {
        step: 2,
        description: "Jogue a farinha em um pote",
      },
    ]);
  });
  it("should create a recipe with minimum data", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    const result = await sut.execute({
      title: "Bolo de Laranja",
      description: "Receita de bolo de laranja",
      preparationTime: 60,
      categoryId: category.id.toString(),
      createdBy: "user-1",

      recipeIngredient: [
        {
          ingredient: "Açucar",
          amount: "1",
          unit: "Kg",
        },
      ],

      recipeStep: [
        {
          step: 1,
          description: "Jogue o açucar em um pote",
        },
      ],
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(1);
    expect(inMemoryRecipeStepRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipe).toMatchObject({
        title: "Bolo de Laranja",
        description: "Receita de bolo de laranja",
      });
    }
  });
  it("should not create a recipe when category does not exist", async () => {
    const result = await sut.execute({
      // create recipe
      title: "Bolo de Laranja",
      description: "Receita de bolo de laranja",
      preparationTime: 60,
      categoryId: "0",
      createdBy: "user-1",

      recipeIngredient: [
        {
          ingredient: "Açucar",
          amount: "1",
          unit: "Kg",
        },
      ],

      recipeStep: [
        {
          step: 1,
          description: "Jogue o açucar em um pote",
        },
      ],
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
    expect(inMemoryRecipeRepository.items).toHaveLength(0);
  });
  it("should not to create a recipe without ingredients", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    const result = await sut.execute({
      title: "Bolo de Laranja",
      description: "Receita de bolo de laranja",
      preparationTime: 60,
      categoryId: category.id.toString(),
      createdBy: "user-1",

      recipeIngredient: [],

      recipeStep: [
        {
          step: 1,
          description: "Jogue a farinha no pote",
        },
      ],
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(RecipeNullError);
    expect(inMemoryRecipeRepository.items).toHaveLength(0);
  });
  it("should not create a recipe without steps", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    const result = await sut.execute({
      title: "Bolo de Laranja",
      description: "Receita de bolo de laranja",
      preparationTime: 60,
      categoryId: category.id.toString(),
      createdBy: "user-1",

      recipeIngredient: [
        {
          ingredient: "Farinha",
          amount: "1",
          unit: "Kg",
        },
      ],

      recipeStep: [],
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(RecipeNullError);
    expect(inMemoryRecipeRepository.items).toHaveLength(0);
  });
});
