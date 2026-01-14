import { Either, failure, success } from "../../../core/either";
import { User } from "../../../core/entities/user";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { UserRepository } from "../../repositories/user-repository";

interface GetMeUseCaseRequest {
  id: string;
}

type GetMeUseCaseResponse = Either<
  NotFoundError,
  {
    user: User;
  }
>;

export class GetMeUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: GetMeUseCaseRequest): Promise<GetMeUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    // verify if user exists

    if (!user) {
      return failure(new NotFoundError("user"));
    }

    return success({
      user,
    });
  }
}
