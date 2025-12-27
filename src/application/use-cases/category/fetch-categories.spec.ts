import { describe, expect, it } from "vitest";
import { InMemoryCategoriesRepository } from "../../../../test/repositories/in-memory-categories-repository";
import { FetchCategoriesUseCase } from "./fetch-categories";
import { beforeEach } from "vitest";
import { makeCategory } from "../../../../test/factories/make-category";

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: FetchCategoriesUseCase;

describe("Fetch categories", () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new FetchCategoriesUseCase(inMemoryCategoriesRepository);
  });

  it("should be able to list all categories", async () => {
    // create categories

    const category1 = makeCategory();
    const category2 = makeCategory();

    await inMemoryCategoriesRepository.create(category1);
    await inMemoryCategoriesRepository.create(category2);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryCategoriesRepository.items.length).toBeGreaterThan(1);
    expect(inMemoryCategoriesRepository.items).toHaveLength(2);
  });
});
