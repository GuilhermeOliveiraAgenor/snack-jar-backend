import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface StatusProps {
  // create interface
  code: string;
  description: string; // fields
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Status {
  constructor(
    private readonly _id: UniqueEntityID, // create id table
    private props: StatusProps, // import fields from interface
  ) {}

  static create(props: { code: string; description: string }, id?: UniqueEntityID) {
    const status = new Status(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
    });
    return status;
  }

  // get
  get id() {
    return this._id;
  }

  get code() {
    return this.props.code;
  }

  get description() {
    return this.props.description;
  }

  get createdAt(): Date | null | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
  // set

  set code(code: string) {
    this.props.code = code;
    this.touch();
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
    this.touch();
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
    this.touch();
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
    this.touch();
  }

  private touch() {
    // update fields when realize set
    this.props.updatedAt = new Date();
  }
}
