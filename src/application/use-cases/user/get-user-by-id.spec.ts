import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { GetUserByIdUseCase } from "../user/get-user-by-id";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByIdUseCase;

describe("Get User By Id", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByIdUseCase(inMemoryUserRepository);
  });

  it("should be able to get user by id", async () => {
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
  it("should not be able to get a user when id does not exist", async () => {
    const result = await sut.execute({ id: "0" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
