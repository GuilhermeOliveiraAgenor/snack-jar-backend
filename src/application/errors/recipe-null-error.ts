import { BaseError } from "../../core/errors/base-error";

export class RecipeNullError extends BaseError {
  constructor(resource: string) {
    super(422, `validationFields.${resource}`, "Ingredients or Steps required");
  }
}
