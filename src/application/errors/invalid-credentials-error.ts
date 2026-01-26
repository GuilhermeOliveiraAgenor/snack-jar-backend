import { BaseError } from "../../core/errors/base-error";

export class InvalidCredentialsError extends BaseError {
  constructor(resource: string) {
    super(409, `unauthorized.${resource}`, "Invalid Credentials");
  }
}
