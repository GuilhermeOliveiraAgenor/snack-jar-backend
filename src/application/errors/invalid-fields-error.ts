import { BaseError } from "../../core/errors/base-error";

export class InvalidFieldsError extends BaseError {
  constructor(resource: string) {
    super(422, `validationFields.${resource}`, "Invalid Fields");
  }
}
