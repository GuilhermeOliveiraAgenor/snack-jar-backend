import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface CategoryProps {
  // create interface
  name: string;
  description: string; // fields
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export class Category {
  constructor(
    private readonly _id: UniqueEntityID, // create id table
    private props: CategoryProps, // import fields from interface
  ) {}

  static create(props: { name: string; description: string }, id?: UniqueEntityID) {
    const category = new Category(
      id ?? new UniqueEntityID(), // create id
      {
        ...props, // import fields
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      },
    );
    return category;
  }

  // get
  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
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

  set name(name: string) {
    this.props.name = name;
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
