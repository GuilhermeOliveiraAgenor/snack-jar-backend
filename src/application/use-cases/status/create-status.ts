import { Either, success } from "../../../core/either";
import { Status } from "../../../core/entities/status";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { StatusRepository } from "../../repositories/status-repository";

interface CreateStatusUseCaseRequest {
  code: Status["code"];
  description: Status["description"];
}

type CreateStatusUseCaseResponse = Either<
  AlreadyExistsError,
  {
    status: Status;
  }
>;

export class CreateStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}

  async execute({
    code,
    description,
  }: CreateStatusUseCaseRequest): Promise<CreateStatusUseCaseResponse> {
    const status = Status.create({
      code,
      description,
    });

    await this.statusRepository.create(status);

    return success({
      status,
    });
  }
}
