import { BaseError } from "../../core/errors/base-error";

export class RecipeNullError extends BaseError {
  constructor(resource: string) {
    super(409, `recipe-null.${resource}`, "can not be null");
  }
}
