import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { EditCategoryUseCase } from "../category/edit-category";
import { makeCategory } from "../../../../test/factories/make-category";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: EditCategoryUseCase;

describe("Edit Category Use Case", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(); // define repository
    sut = new EditCategoryUseCase(inMemoryCategoriesRepository); // use case receive repository
  });

  it("should update category", async () => {
    // create category
    const category = makeCategory();

    // pass to repository
    await inMemoryCategoriesRepository.create(category);

    // pass the object to use case
    const result = await sut.execute({
      name: "Prato doce",
      description: "Prato",
      id: category.id,
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.category).toMatchObject({
        name: "Prato doce",
      });
    }
  });

  it("should not update a category when id does not exist", async () => {
    const result = await sut.execute({
      id: new UniqueEntityID("0"),
      name: "Prato doce",
      description: "Prato",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
