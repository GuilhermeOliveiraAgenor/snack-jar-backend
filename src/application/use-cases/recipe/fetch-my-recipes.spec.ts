import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { Category } from "../../../core/entities/category";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { FetchMyRecipesUseCase } from "./fetch-my-recipes";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { Recipe } from "../../../core/entities/recipe";
import { RecipeStatus } from "../../../core/enum/enum-status";
import { User } from "../../../core/entities/user";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

let sut: FetchMyRecipesUseCase;

describe("Fetch My Recipes Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchMyRecipesUseCase(inMemoryRecipeRepository, inMemoryUserRepository);
  });

  it("should fetch my recipes", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category);

    const user = User.create({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    await inMemoryUserRepository.create(user);

    const recipe1 = Recipe.create({
      title: "Bolo de Cenoura",
      description: "Receita de bolo de cenoura",
      preparationTime: 60,
      status: RecipeStatus.ACTIVE,
      categoryId: category.id,
      createdBy: user.id,
    });

    const recipe2 = Recipe.create({
      title: "Bolo de Chocolate",
      description: "Receita de bolo de chocolate",
      preparationTime: 60,
      status: RecipeStatus.ACTIVE,
      categoryId: category.id,
      createdBy: user.id,
    });

    await inMemoryRecipeRepository.create(recipe1);
    await inMemoryRecipeRepository.create(recipe2);

    const result = await sut.execute({ userId: user.id.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeRepository.items).toHaveLength(2);
    expect(inMemoryRecipeRepository.items.length).toBeGreaterThan(1);
    if (result.isSuccess()) {
      expect(
        // list each item and verify id
        inMemoryRecipeRepository.items.every(
          (recipe) => recipe.createdBy?.toString() === user.id.toString(),
        ),
      ).toBe(true);
    }
  });
});
