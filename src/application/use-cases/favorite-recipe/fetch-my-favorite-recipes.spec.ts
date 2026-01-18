import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryFavoriteRecipeRepository } from "../../../../test/repositories/in-memory-favorite-recipe-repository";
import { FetchMyFavoriteRecipesUseCase } from "./fetch-my-favorite-recipes";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { makeFavoriteRecipe } from "../../../../test/factories/make-favorite-recipe";
import { makeUser } from "../../../../test/factories/make-user";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";

let inMemoryFavoriteRecipeRepository: InMemoryFavoriteRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: FetchMyFavoriteRecipesUseCase;

describe("Fetch My Favorite Recipes", () => {
  beforeEach(() => {
    inMemoryFavoriteRecipeRepository = new InMemoryFavoriteRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new FetchMyFavoriteRecipesUseCase(
      inMemoryFavoriteRecipeRepository,
      inMemoryUserRepository,
    );
  });
  it("should be able to fetch my favorite recipes by user id", async () => {
    const user = makeUser();

    await inMemoryUserRepository.create(user);

    const favoriteRecipe = makeFavoriteRecipe({
      createdBy: new UniqueEntityID(user.id.toString()),
    });

    await inMemoryFavoriteRecipeRepository.create(favoriteRecipe);

    const result = await sut.execute({
      createdBy: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.favoriteRecipes).toHaveLength(1);
    }
  });
});
