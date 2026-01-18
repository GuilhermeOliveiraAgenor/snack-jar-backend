import { BaseError } from "../../core/errors/base-error";

export class InternalServerError extends BaseError {
  constructor() {
    super(500, `internal`, "Internal server error");
  }
}
