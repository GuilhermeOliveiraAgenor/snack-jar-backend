import { Status } from "../../core/entities/status";

export interface StatusRepository {
  create(status: Status): Promise<void>;
  save(status: Status): Promise<void>;
  findMany(): Promise<Status[]>;
  findById(id: string): Promise<Status | null>;
}
