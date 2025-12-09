import { path } from "ramda";
import errorCodes from "./error-codes.json";

export class BaseError extends Error {
  public statusCode: number;
  public errorCode: unknown;

  // create parameters
  constructor(statusCode: number, errorPath: string, message: string) {
    super(message);

    this.statusCode = statusCode; // pass status code
    this.errorCode = path(errorPath.split("."), errorCodes); // configure path

    Object.setPrototypeOf(this, new.target.prototype); // define object
  }

  public getBody() {
    return {
      message: this.message,
      errorCode: this.errorCode,
    };
  }
}
