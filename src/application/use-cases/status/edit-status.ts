import { Either, failure, success } from "../../../core/either";
import { Status } from "../../../core/entities/status";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { StatusRepository } from "../../repositories/status-repository";

interface EditStatusUseCaseRequest {
  code: Status["code"];
  description: Status["description"];
  id: string;
}

type EditStatusUseCaseResponse = Either<
  NotFoundError,
  {
    status: Status;
  }
>;

export class EditStatusUseCase {
  constructor(private statusRepository: StatusRepository) {}

  async execute({
    code,
    description,
    id,
  }: EditStatusUseCaseRequest): Promise<EditStatusUseCaseResponse> {
    const status = await this.statusRepository.findById(id);

    // status not exists
    if (!status) {
      return failure(new NotFoundError("status"));
    }

    status.code = code ?? status.code;
    status.description = description ?? status.description;

    await this.statusRepository.save(status);

    return success({
      status,
    });
  }
}
