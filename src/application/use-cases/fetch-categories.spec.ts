import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../test/repositories/in-memory-categories-repository";
import { FetchCategoriesUseCase } from "./fetch-categories";
import { beforeEach } from "vitest";
import { Category } from "../../core/entities/category";
import { NotFoundError } from "../errors/resource-not-found-error";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: FetchCategoriesUseCase;

describe("Fetch categories", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchCategoriesUseCase(inMemoryCategoriesRepository);
  });

  it("should be able to list categories", async () => {
    // create categories

    const category1 = Category.create({
      name: "Salgado",
      description: "Pratos salgados",
    });
    const category2 = Category.create({
      name: "Prato doce",
      description: "Prato",
    });

    await inMemoryCategoriesRepository.create(category1);
    await inMemoryCategoriesRepository.create(category2);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryCategoriesRepository.items.length).toBeGreaterThan(1);
    expect(inMemoryCategoriesRepository.items).toHaveLength(2);
  });
});
