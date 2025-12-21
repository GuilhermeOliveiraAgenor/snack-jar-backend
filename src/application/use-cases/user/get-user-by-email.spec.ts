import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { GetUserByEmailUseCase } from "./get-user-by-email";
import { User } from "../../../core/entities/user";
import { NotFoundError } from "../../errors/resource-not-found-error";

let inMemoryUserRepository: InMemoryUserRepository;
let sut: GetUserByEmailUseCase;

describe("Get User By Email", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    sut = new GetUserByEmailUseCase(inMemoryUserRepository);
  });

  it("should create to get user by email", async () => {
    const user = User.create({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
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
  it("should not get user with email does not exists", async () => {
    const result = await sut.execute({ email: "pedro@gmail.com" });

    expect(result.isError()).toBe(true);
    expect(result.value).toBeInstanceOf(NotFoundError);
  });
});
