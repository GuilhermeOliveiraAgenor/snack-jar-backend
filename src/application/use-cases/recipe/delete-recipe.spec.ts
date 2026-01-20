import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { DeleteRecipeUseCase } from "./delete-recipe";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeCategory } from "../../../../test/factories/make-category";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { makeUser } from "../../../../test/factories/make-user";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { RecipeStatus } from "../../../core/enum/recipe-status";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryUserRepository: InMemoryUserRepository;

let sut: DeleteRecipeUseCase;

describe("Soft delete Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryUserRepository = new InMemoryUserRepository();

    sut = new DeleteRecipeUseCase(inMemoryRecipeRepository);
  });

  it("should be able to soft delete a recipe", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const category = makeCategory();
    await inMemoryCategoriesRepository.create(category);

    const recipe = makeRecipe({
      createdBy: new UniqueEntityID(user.id.toString()),
    });
    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({ id: recipe.id.toString(), deletedBy: user.id.toString() });

    expect(result.isSuccess()).toBe(true);
    if (result.isSuccess()) {
      expect(result.value.recipe).toMatchObject({
        status: RecipeStatus.INACTIVE,
        deletedBy: new UniqueEntityID(user.id.toString()),
      });
    }
  });
  it("should not be able to delete a recipe when recipe id does not exist", async () => {
    const user = makeUser();
    await inMemoryUserRepository.create(user);

    const result = await sut.execute({ id: "0", deletedBy: user.id.toString() });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
  it("should not be able to delete a recipe when user is not creator", async () => {
    const user1 = makeUser();
    await inMemoryUserRepository.create(user1);

    const user2 = makeUser();
    await inMemoryUserRepository.create(user2);

    const recipe = makeRecipe({
      createdBy: user1.id,
    });
    await inMemoryRecipeRepository.create(recipe);

    const result = await sut.execute({ id: recipe.id.toString(), deletedBy: user2.id.toString() });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
  it("should not be able to delete recipe is not ACTIVE", async() =>{
    const recipe = makeRecipe({
        status: RecipeStatus.INACTIVE
      });
      await inMemoryRecipeRepository.create(recipe)
      console.log(recipe)

      const result = await sut.execute({
          id: recipe.id.toString(),
          deletedBy: "user-1"
      })

      expect(result.isError()).toBe(true)
      expect(result.value).toBeInstanceOf(NotAllowedError)

  })
});
