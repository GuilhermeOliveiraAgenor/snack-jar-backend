import { BaseError } from "../../core/errors/base-error";

export class AlreadyExistsError extends BaseError {
  constructor(resource: string) {
    super(409, `already-exists.${resource}`, "Already Exists");
  }
}
