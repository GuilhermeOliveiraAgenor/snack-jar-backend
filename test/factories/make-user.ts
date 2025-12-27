import { faker } from "@faker-js/faker";
import { User, UserProps } from "../../src/core/entities/user";

export function makeUser(override?: Partial<UserProps>) {
  return User.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...override,
  });
}
