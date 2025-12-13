import { beforeEach, describe, expect, expect, it } from "vitest";
import { InMemoryStatusRepository } from "../../../../test/repositories/in-memory-status-repository";
import { CreateStatusUseCase } from "./create-status";
import { Status } from "../../../core/entities/status";

let inMemoryStatusRepository: InMemoryStatusRepository;
let sut: CreateStatusUseCase;

describe("Create Status Use Case", () => {
  beforeEach(() => {
    inMemoryStatusRepository = new InMemoryStatusRepository();
    sut = new CreateStatusUseCase(inMemoryStatusRepository);
  });

  it("should be able to register status", async () => {
    const status = Status.create({
      code: "Ativo",
      description: "Receita ativa",
    });

    const result = await sut.execute(status);

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryStatusRepository.items).toHaveLength(1);
    expect(result.value.status).toMatchObject({
      code: "Ativo",
      description: "Receita ativa",
    });
  });
});
