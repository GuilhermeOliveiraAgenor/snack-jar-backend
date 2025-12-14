import { describe, expect, it } from "vitest";
import { InMemoryStatusRepository } from "../../../../test/repositories/in-memory-status-repository";
import { beforeEach } from "vitest";
import { FetchStatusUseCase } from "./fetch-status";
import { Status } from "../../../core/entities/status";

let inMemoryStatusRepository: InMemoryStatusRepository;
let sut: FetchStatusUseCase;

describe("Fetch status", () => {
  beforeEach(() => {
    inMemoryStatusRepository = new InMemoryStatusRepository();
    sut = new FetchStatusUseCase(inMemoryStatusRepository);
  });

  it("should be able to list status", async () => {
    // create status

    const status1 = Status.create({
      code: "Ativo",
      description: "Código ativo",
    });
    const status2 = Status.create({
      code: "Inativo",
      description: "Código inativo",
    });

    await inMemoryStatusRepository.create(status1);
    await inMemoryStatusRepository.create(status2);

    const result = await sut.execute();

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryStatusRepository.items.length).toBeGreaterThan(1);
    expect(inMemoryStatusRepository.items).toHaveLength(2);
  });
});
