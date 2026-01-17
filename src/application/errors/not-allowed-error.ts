import { BaseError } from "../../core/errors/base-error";

export class NotAllowedError extends BaseError {
  constructor(resource: string) {
    super(409, `notAllowed.${resource}`, "User not allowed");
  }
}
