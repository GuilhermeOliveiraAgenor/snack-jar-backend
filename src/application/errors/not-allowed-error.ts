import { BaseError } from "../../core/errors/base-error";

export class NotAllowedError extends BaseError {
  constructor(resource: string) {
    super(409, `forbidden.${resource}`, "Not allowed");
  }
}
