import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { CreateUserUseCase } from "../user/create-user";
import { FakeHashProvider } from "../../../../test/cryptography/fake-hash-provider";
import { User } from "../../../core/entities/user";
import { AlreadyExistsError } from "../../errors/already-exists-error";

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
    const result = await sut.execute({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.user).toMatchObject({
        email: "joao@gmail.com",
      });
    }
  });

  it("should not be able to register user with same name", async () => {
    const user = User.create({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    await inMemoryUserRepository.create(user);

    const result = await sut.execute({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(AlreadyExistsError);
  });
});
