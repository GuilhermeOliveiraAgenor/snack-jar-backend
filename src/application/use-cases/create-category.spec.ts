import { InMemoryCategoriesRepository } from "../../../test/repositories/in-memory-categories-repository";
import { Category } from "../../core/entities/category";
import { AlreadyExistsError } from "../errors/already-exists-error";
import { CreateCategoryUseCase } from "./create-category";
import { describe, it, expect, beforeEach } from "vitest";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: CreateCategoryUseCase;

describe("Category Use Case", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(); // define repository
    sut = new CreateCategoryUseCase(inMemoryCategoriesRepository); // use case receive repository
  });
  it("should able to register category", async () => {
    const category = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    const result = await sut.execute(category);

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
    expect(result.value.category).toMatchObject({
      name: "Salgados",
      description: "Pratos salgados",
    });
  });

  it("should not be able to register category with same name", async () => {
    const category1 = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await sut.execute(category1);

    const category2 = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    const result = await sut.execute(category2);

    expect(result.isError()).toBe(true);
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
  });
});
