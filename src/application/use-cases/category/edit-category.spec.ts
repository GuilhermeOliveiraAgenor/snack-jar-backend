import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { EditCategoryUseCase } from "./edit-category";
import { Category } from "../../../core/entities/category";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: EditCategoryUseCase;

describe("Edit Category Use Case", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(); // define repository
    sut = new EditCategoryUseCase(inMemoryCategoriesRepository); // use case receive repository
  });

  it("should be able to edit category", async () => {
    // create category
    const category = Category.create({
      name: "Doces",
      description: "Pratos doces",
    });

    // pass to repository
    await inMemoryCategoriesRepository.create(category);

    // pass the object to use case
    const result = await sut.execute({
      name: "Prato doce",
      description: "Prato",
      id: category.id,
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.category).toMatchObject({
      name: "Prato doce",
    });
  });

  it("should be not able to edit category not exists", async () => {
    const result = await sut.execute({
      id: new UniqueEntityID("0"),
      name: "Prato doce",
      description: "Prato",
    });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
