import { describe, expect, it } from "vitest";
import { FetchCategoriesUseCase } from "./fetch-categories";
import { beforeEach } from "vitest";
import { makeCategory } from "../../../../test/factories/make-category";
import { InMemoryCategoryRepository } from "../../../../test/repositories/in-memory-categories-repository";

let inMemoryCategoryRepository: InMemoryCategoryRepository;
let sut: FetchCategoriesUseCase;

describe("Fetch categories", () => {
  beforeEach(() => {
    inMemoryCategoryRepository = new InMemoryCategoryRepository();
    sut = new FetchCategoriesUseCase(inMemoryCategoryRepository);
  });

  it("should be able to list all categories", async () => {
    // create categories

    const category1 = makeCategory();
    const category2 = makeCategory();

    await inMemoryCategoryRepository.create(category1);
    await inMemoryCategoryRepository.create(category2);

    const result = await sut.execute({});

    console.log(result.value?.categories);
    console.log(result.value?.meta);

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryCategoryRepository.items.length).toBeGreaterThan(1);
    expect(inMemoryCategoryRepository.items).toHaveLength(2);
  });
});
