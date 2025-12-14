import { Either, failure, success } from "../../../core/either";
import { Status } from "../../../core/entities/status";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { StatusRepository } from "../../repositories/status-repository";

type FetchStatusUseCaseResponse = Either<
  NotFoundError,
  {
    status: Status[];
  }
>;

export class FetchStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}

  async execute(): Promise<FetchStatusUseCaseResponse> {
    const status = await this.statusRepository.findMany();

    if (!status) {
      return failure(new NotFoundError("status"));
    }

    return success({
      status,
    });
  }
}
