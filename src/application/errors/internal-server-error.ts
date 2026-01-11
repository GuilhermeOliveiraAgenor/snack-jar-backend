import { BaseError } from "../../core/errors/base-error";

export class InternalServerError extends BaseError {
  constructor() {
    super(500, `internalServer`, "Internal server error");
  }
}
