import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { GetUserByEmailUseCase } from "./get-user-by-email";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByEmailUseCase;

describe("Get User By Email", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByEmailUseCase(inMemoryUserRepository);
  });

  it("should be able get a user by email", async () => {
    const user = makeUser({
      email: "joao@gmail.com",
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({ email: user.email });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.user).toMatchObject({
        email: "joao@gmail.com",
      });
    }
  });
  it("should not be able to get a user when email does not exist", async () => {
    const result = await sut.execute({ email: "pedro@gmail.com" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
