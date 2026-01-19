import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { DeleteRecipeIngredientUseCase } from "./delete-recipe-ingredient";
import { makeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";

let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: DeleteRecipeIngredientUseCase;

describe("Delete Recipe Ingredient", () => {
  beforeEach(() => {
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new DeleteRecipeIngredientUseCase(inMemoryRecipeIngredientRepository);
  });
  it("should be able to delete a recipe ingredient", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const recipeIngredient = makeRecipeIngredient({
      createdBy: user.id,
    });
    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      id: recipeIngredient.id.toString(),
      deletedBy: user.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryRecipeIngredientRepository.items).toHaveLength(0);
  });
  it("should not be able to edit recipe ingredient when id does not exists", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      id: "0",
      deletedBy: user.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should not be able to edit recipe ingredient when user is not creator", async () => {
    const user1 = makeUser();
    await inMemoryUserRepository.create(user1);

    const user2 = makeUser();
    await inMemoryUserRepository.create(user2);

    const recipeIngredient = makeRecipeIngredient({
      createdBy: user1.id,
    });
    await inMemoryRecipeIngredientRepository.create(recipeIngredient);

    const result = await sut.execute({
      id: recipeIngredient.id.toString(),
      deletedBy: user2.id.toString(),
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
