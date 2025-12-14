import { IHashProvider } from "../../src/core/cryptography/IHashProvider";

export class FakeHashProvider implements IHashProvider {
  async hash(plain: string): Promise<string> {
    return `hashed-${plain}`;
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return hash === `hashed-${plain}`;
  }
}
