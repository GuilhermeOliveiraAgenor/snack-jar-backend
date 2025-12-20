import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { CreateRecipeUseCase } from "./create-recipe";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { InMemoryPreparationMethodRepository } from "../../../../test/repositories/in-memory-preparation-method";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { Category } from "../../../core/entities/category";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { AlreadyExistsError } from "../../errors/already-exists-error";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryPreparationMethodRepository: InMemoryPreparationMethodRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: CreateRecipeUseCase;

describe("Create Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryPreparationMethodRepository = new InMemoryPreparationMethodRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new CreateRecipeUseCase(
      inMemoryRecipeRepository,
      inMemoryRecipeIngredientRepository,
      inMemoryPreparationMethodRepository,
      inMemoryCategoriesRepository,
    );
  });

  it("should be able to register recipe", async () => {
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

      preparationMethod: [
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
    expect(inMemoryPreparationMethodRepository.items).toHaveLength(2);
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
    expect(inMemoryPreparationMethodRepository.items).toMatchObject([
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
  it("should be able to register recipe with minumum data", async () => {
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

      preparationMethod: [
        {
          step: 1,
          description: "Jogue o açucar em um pote",
        },
      ],
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(1);
    expect(inMemoryPreparationMethodRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.recipe).toMatchObject({
        title: "Bolo de Laranja",
        description: "Receita de bolo de laranja",
      });
    }
  });
  it("should not be able register with category not exists", async () => {
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

      preparationMethod: [
        {
          step: 1,
          description: "Jogue o açucar em um pote",
        },
      ],
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
    expect(inMemoryRecipeRepository.items).toHaveLength(0);
  });
});
