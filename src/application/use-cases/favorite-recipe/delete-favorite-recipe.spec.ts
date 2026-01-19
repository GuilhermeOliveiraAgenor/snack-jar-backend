import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteRecipeRepository } from "../../../../test/repositories/in-memory-favorite-recipe-repository";
import { DeleteFavoriteRecipeUseCase } from "./delete-favorite-recipe";
import { makeFavoriteRecipe } from "../../../../test/factories/make-favorite-recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";

let inMemoryFavoriteRecipeRepository: InMemoryFavoriteRecipeRepository;
let inMemoryUserRepository: InMemoryUserRepository;
let sut: DeleteFavoriteRecipeUseCase;

describe("Delete Favorite Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryFavoriteRecipeRepository = new InMemoryFavoriteRecipeRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new DeleteFavoriteRecipeUseCase(inMemoryFavoriteRecipeRepository);
  });
  it("should be able to delete favorite recipe", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const favoriteRecipe = makeFavoriteRecipe({
      createdBy: user.id,
    });

    await inMemoryFavoriteRecipeRepository.create(favoriteRecipe);

    const result = await sut.execute({
      id: favoriteRecipe.id.toString(),
      deletedBy: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryFavoriteRecipeRepository.items).toHaveLength(0);
  });
  it("should not be able to delete favorite recipe when id does not exists", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const favoriteRecipe = makeFavoriteRecipe({
      createdBy: user.id,
    });

    await inMemoryFavoriteRecipeRepository.create(favoriteRecipe);

    const result = await sut.execute({
      id: "0",
      deletedBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should not be able to delete favorite recipe when user is not creator", async () => {
    const user1 = makeUser();
    const user2 = makeUser();

    await inMemoryUserRepository.create(user1);
    await inMemoryUserRepository.create(user2);

    const favoriteRecipe = makeFavoriteRecipe({
      createdBy: user1.id,
    });

    await inMemoryFavoriteRecipeRepository.create(favoriteRecipe);

    const result = await sut.execute({
      id: favoriteRecipe.id.toString(),
      deletedBy: user2.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
