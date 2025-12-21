import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { User } from "../../../core/entities/user";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { GetUserByIdUseCase } from "../user/get-user-by-id";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByIdUseCase;

describe("Get User By Id", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByIdUseCase(inMemoryUserRepository);
  });

  it("should return user by id", async () => {
    const user = User.create({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
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
  it("should not return a user when id does not exist", async () => {
    const result = await sut.execute({ id: "0" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
