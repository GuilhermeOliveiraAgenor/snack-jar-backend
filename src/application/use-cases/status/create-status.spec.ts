import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStatusRepository } from "../../../../test/repositories/in-memory-status-repository";
import { CreateStatusUseCase } from "./create-status";

let inMemoryStatusRepository: InMemoryStatusRepository;
let sut: CreateStatusUseCase;

describe("Create Status Use Case", () => {
  beforeEach(() => {
    inMemoryStatusRepository = new InMemoryStatusRepository();
    sut = new CreateStatusUseCase(inMemoryStatusRepository);
  });

  it("should be able to register status", async () => {
    const result = await sut.execute({
      code: "Ativo",
      description: "Receita ativa",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryStatusRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.status).toMatchObject({
        code: "Ativo",
        description: "Receita ativa",
      });
    }
  });
});
