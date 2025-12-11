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

    expect(result.category).toBeInstanceOf(Category);
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
    expect(result.category).toMatchObject({
      name: "Salgados",
      description: "Pratos salgados",
    });
  });

  it("should not be able to register duplicated category", async () => {
    // primeiro cadastro
    await sut.execute({
      name: "Salgados",
      description: "Pratos salgados",
    });

    // segundo cadastro -> DEVE FALHAR
    await expect(
      sut.execute({
        name: "Salgados",
        description: "Pratos salgados",
      }),
    ).rejects.toBeInstanceOf(AlreadyExistsError);

    // deve continuar com 1 item apenas
    expect(inMemoryCategoriesRepository.items).toHaveLength(1);
  });
});
