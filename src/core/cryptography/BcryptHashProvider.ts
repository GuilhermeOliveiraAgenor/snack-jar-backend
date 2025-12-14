import { IHashProvider } from "./IHashProvider";
import bcrypt from "bcryptjs";

export class BcryptHashProvider implements IHashProvider {
  hash(plain: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(plain, saltRounds);
  }
  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
