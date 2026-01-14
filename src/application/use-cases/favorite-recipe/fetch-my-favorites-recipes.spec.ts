import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryFavoriteRecipeRepository } from "../../../../test/repositories/in-memory-favorite-recipe-repository";
import { FetchMyFavoriteRecipesUseCase } from "./fetch-my-favorites-recipes";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { makeFavoriteRecipe } from "../../../../test/factories/make-favorite-recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryFavoriteRecipeRepository: InMemoryFavoriteRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: FetchMyFavoriteRecipesUseCase;

describe("Fetch My Recipes", () => {
  beforeEach(() => {
    inMemoryFavoriteRecipeRepository = new InMemoryFavoriteRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new FetchMyFavoriteRecipesUseCase(
      inMemoryFavoriteRecipeRepository,
      inMemoryUserRepository,
    );
  });
  it("should be able to fetch my favorite recipes by user id", async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const favoriteRecipe = makeFavoriteRecipe({userId: user.id});

    await inMemoryFavoriteRecipeRepository.create(favoriteRecipe);

    const result = await sut.execute({
      id: favoriteRecipe.userId.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.favoriteRecipe).toHaveLength(1);
    }
  });
  it("should not be able to fetch my favorite recipes when user id not exists", async () => {
    const result = await sut.execute({ id: "0" });

    expect(result.isError()).toBe(true);
    expect(inMemoryFavoriteRecipeRepository.items).toHaveLength(0);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
