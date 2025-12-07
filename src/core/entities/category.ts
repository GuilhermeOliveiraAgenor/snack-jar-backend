import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface CategoryProps {
  // create interface
  description: string; // fields
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export class Category {
  constructor(
    private readonly _id: UniqueEntityID, // create id table
    private props: CategoryProps, // import fields from interface
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(), // optional fields
      updatedAt: props.updatedAt ?? null,
      deletedAt: props.deletedAt ?? null,
    };
  }
  // get
  get id() {
    return this._id;
  }

  get description() {
    return this.props.description;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }
  // set
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
