import { Either, failure, success } from "../../../core/either";
import { User } from "../../../core/entities/user";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-repository";

interface GetUserByEmailUseCaseRequest {
  email: string;
}

type GetUserByEmailUseCaseResponse = Either<
  NotFoundError,
  {
    user: User;
  }
>;

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email);

    // verify if user exists

    if (!user) {
      return failure(new NotFoundError("user"));
    }

    return success({
      user,
    });
  }
}
