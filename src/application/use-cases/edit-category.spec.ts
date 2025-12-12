import { beforeEach } from "node:test";
import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../test/repositories/in-memory-categories-repository";
import { EditCategoryUseCase } from "./edit-category";
import { Category } from "../../core/entities/category";
import { ca, id, tr } from "zod/v4/locales";
import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: EditCategoryUseCase;

describe("Edit Category Use Case", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(); // define repository
    sut = new EditCategoryUseCase(inMemoryCategoriesRepository); // use case receive repository
  });

  it("should be able to edit category", async () => {
    const category = Category.create({
      name: "Doces",
      description: "Pratos doces",
    });

    await inMemoryCategoriesRepository.create(category);

    const result = await sut.execute({
      id: new UniqueEntityID(category.id.toString()),
      name: "Prato doce",
      description: "Prato",
    });

    expect(result.isSuccess()).toBe(true);
    expect(result.value.category).toMatchObject({
      name: "Prato doce",
    });
  });
});
