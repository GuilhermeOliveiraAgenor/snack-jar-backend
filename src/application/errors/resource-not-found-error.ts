import { BaseError } from "../../core/errors/base-error";

export class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(409, `notFound.${resource}`, "Not Found");
  }
}
