import { beforeEach, describe, expect, it } from "vitest";
import { FakeHashProvider } from "../../../../test/cryptography/fake-hash-provider";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { CreateUserUseCase } from "./create-user";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";

let inMemoryUserRepository = new InMemoryUserRepository();
let hashProvider: FakeHashProvider;
let sutAuth: AuthenticateUserUseCase;
let sutCreate: CreateUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    hashProvider = new FakeHashProvider();
    sutAuth = new AuthenticateUserUseCase(inMemoryUserRepository, hashProvider);
    sutCreate = new CreateUserUseCase(inMemoryUserRepository, hashProvider);
  });
  it("should be able to authenticate user", async () => {
    await sutCreate.execute({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    const result = await sutAuth.execute({
      email: "joao@gmail.com",
      password: "joao123",
    });

    expect(result.isSuccess()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    if (result.isSuccess()) {
      expect(result.value.userId).toBeDefined();
    }
  });
  it("should not be able to authenticate user with invalid email", async () => {
    await sutCreate.execute({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    const result = await sutAuth.execute({
      email: "pedro@gmail.com",
      password: "joao123",
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to authenticate user with invalid password", async () => {
    await sutCreate.execute({
      name: "João",
      email: "joao@gmail.com",
      password: "joao123",
    });

    const result = await sutAuth.execute({
      email: "joao@gmail.com",
      password: "joao",
    });

    expect(result.isError()).toBe(true);
    expect(inMemoryUserRepository.items).toHaveLength(1);
    expect(result.value).toBeInstanceOf(InvalidCredentialsError);
  });
});
