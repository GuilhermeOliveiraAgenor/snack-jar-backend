import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { CreateUserUseCase } from "./create-user";
import { FakeHashProvider } from "../../../../test/cryptography/fake-hash-provider";
import { User } from "../../../core/entities/user";

let inMemoryUserRepository = new InMemoryUserRepository();
let hashProvider: FakeHashProvider;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashProvider = new FakeHashProvider();
    sut = new CreateUserUseCase(inMemoryUserRepository, hashProvider);
  });

  it("should be able to register user", async () => {
    const user = User.create({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    const result = await sut.execute(user);

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    expect(result.value.user).toMatchObject({
      email: "joao@gmail.com",
    });
  });
});
