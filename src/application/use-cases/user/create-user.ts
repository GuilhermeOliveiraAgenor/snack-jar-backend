import { Either } from "../../../core/either";
import { User } from "../../../core/entities/user";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { UserRepository } from "../../repositories/user-repository";

interface CreateUserUseCaseRequest {
  name: User["name"];
  email: User["email"];
  password: User["password"];
}

type CreateUserUseCaseResponse = Either<
  AlreadyExistsError,
  {
    user: User;
  }
>;

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse>;

  // const userWithSameEmail = await this.userRepository.

}
