import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryFavoriteRecipeRepository } from "../../../../test/repositories/in-memory-favorite-recipe-repository";
import { DeleteFavoriteRecipeUseCase } from "./delete-favorite-recipe";
import { makeFavoriteRecipe } from "../../../../test/factories/make-favorite-recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryFavoriteRecipeRepository: InMemoryFavoriteRecipeRepository;
let sut: DeleteFavoriteRecipeUseCase;

describe("Delete Favorite Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryFavoriteRecipeRepository = new InMemoryFavoriteRecipeRepository();
    sut = new DeleteFavoriteRecipeUseCase(inMemoryFavoriteRecipeRepository);
  });
  it("should be able to delete favorite recipe", async () => {
    const favoriteRecipe = makeFavoriteRecipe();

    await inMemoryFavoriteRecipeRepository.create(favoriteRecipe);

    const result = await sut.execute({ id: favoriteRecipe.id.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryFavoriteRecipeRepository.items).toHaveLength(0);
  });
  it("should not be able to delete favorite recipe when id does not exists", async () => {
    const result = await sut.execute({
      id: "0",
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
