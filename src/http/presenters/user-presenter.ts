import { User } from "../../core/entities/user";
import { BasePresenter } from "./base-presenter";

export class UserPresenter {
  private static map(raw: User) {
    return {
      id: raw.id.toString(),
      name: raw.name,
      email: raw.email,
      createdAt: raw.createdAt,
      updatedAt: raw.createdAt,
    };
  }
  static toHTTP(user: User) {
    return BasePresenter.toResponse(this.map(user));
  }
}
