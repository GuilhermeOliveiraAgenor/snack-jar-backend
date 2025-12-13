import { Either } from "../../../core/either";
import { Status } from "../../../core/entities/status";
import { AlreadyExistsError } from "../../errors/already-exists-error";

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

export class CreateStatusUseCase{
    constructor(statusRepository: StatusRepository){
        
    }
}

