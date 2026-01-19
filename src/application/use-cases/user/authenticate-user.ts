import { IHashProvider } from "../../../core/cryptography/IHashProvider";
import { Either, failure, success } from "../../../core/either";
import { User } from "../../../core/entities/user";
import { InvalidFieldsError } from "../../errors/invalid-fields-error";
import { UserRepository } from "../../repositories/user-repository";

interface AuthenticateUserUseCaseRequest {
  email: User["email"];
  password: User["password"];
}

type AuthenticateUserUseCaseResponse = Either<
  InvalidFieldsError,
  {
    userId: string;
  }
>;

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashProvider: IHashProvider,
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    // verify email
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return failure(new InvalidFieldsError("user"));
    }
    // verify password
    const isValid = await this.hashProvider.compare(password, user.password);

    if (!isValid) {
      return failure(new InvalidFieldsError("user"));
    }

    return success({ userId: user.id.toString() });
  }
}
