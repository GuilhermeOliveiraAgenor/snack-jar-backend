import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";
import { GetMeUseCase } from "./get-me";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetMeUseCase;

describe("Get Me Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetMeUseCase(inMemoryUserRepository);
  });

  it("should be able to get my user", async () => {
    const user = makeUser({
      name: "João",
      email: "joao@gmail.com",
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({ id: user.id.toString() });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.user).toMatchObject({
        name: "João",
        email: "joao@gmail.com",
      });
    }
  });
  it("should not be able to get my user when id does not exist", async () => {
    const result = await sut.execute({ id: "0" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
