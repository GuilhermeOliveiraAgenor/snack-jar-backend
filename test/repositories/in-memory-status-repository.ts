import { StatusRepository } from "../../src/application/repositories/status-repository";
import { Status } from "../../src/core/entities/status";

export class InMemoryStatusRepository implements StatusRepository {
  public items: Status[] = [];

  async create(status: Status): Promise<void> {
    this.items.push(status);
  }
  async save(status: Status): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === status.id);
    this.items[itemIndex] = status;
  }
  async findMany(): Promise<Status[]> {
    return this.items;
  }
  async findById(id: string): Promise<Status | null> {
    const status = this.items.find((item) => item.id.toString() === id);

    if (!status) {
      return null;
    }

    return status;
  }
}
