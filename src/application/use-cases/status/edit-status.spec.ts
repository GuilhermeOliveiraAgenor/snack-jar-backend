import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStatusRepository } from "../../../../test/repositories/in-memory-status-repository";
import { EditStatusUseCase } from "./edit-status";
import { Status } from "../../../core/entities/status";

let inMemoryStatusRepository: InMemoryStatusRepository;
let sut: EditStatusUseCase;

describe("Edit Status Use Case", () => {
  beforeEach(() => {
    inMemoryStatusRepository = new InMemoryStatusRepository();
    sut = new EditStatusUseCase(inMemoryStatusRepository);
  });

  it("should be able to edit", async () => {
    //create object
    const status = Status.create({
      code: "Ativo",
      description: "Receita ativa",
    });

    // pass to repository
    await inMemoryStatusRepository.create(status);

    // pass to use case
    const result = await sut.execute({
      code: "Inativo",
      description: "Receita inativa",
      id: status.id.toString(),
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryStatusRepository.items).toHaveLength(1);
    expect(result.value.status).toMatchObject({
      code: "Inativo",
    });
  });
});
