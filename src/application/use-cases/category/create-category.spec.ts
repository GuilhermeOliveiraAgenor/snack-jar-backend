import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { Category } from "../../../core/entities/category";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { describe, it, expect, beforeEach } from "vitest";
import { CreateCategoryUseCase } from "./create-category";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: CreateCategoryUseCase;

describe("Category Use Case", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository(); // define repository
    sut = new CreateCategoryUseCase(inMemoryCategoriesRepository); // use case receive repository
  });
  it("should create to register category", async () => {
    const result = await sut.execute({
      name: "Salgados",
      description: "Pratos salgados",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.category).toMatchObject({
        name: "Salgados",
        description: "Pratos salgados",
      });
    }
  });

  it("should not create to register category with same name", async () => {
    const category1 = Category.create({
      name: "Salgados",
      description: "Pratos salgados",
    });

    await inMemoryCategoriesRepository.create(category1);

    const result = await sut.execute({
      name: "Salgados",
      description: "Pratos salgados",
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
  });
});
