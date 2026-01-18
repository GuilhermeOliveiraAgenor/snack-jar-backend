import { BaseError } from "../../core/errors/base-error";

export class RecipeNullError extends BaseError {
  constructor(resource: string) {
    super(409, `validationFields.${resource}`, "Ingredients or Steps can not be null");
  }
}
