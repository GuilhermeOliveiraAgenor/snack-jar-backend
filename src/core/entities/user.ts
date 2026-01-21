import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";
import { Optional } from "../types/optional";

export interface UserProps {
  // create interface
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class User {
  constructor(
    private readonly _id: UniqueEntityID, // create id
    private props: UserProps, // import fields props
  ) {}

  static create(
    props: Optional<
    UserProps, 'createdAt' | 'updatedAt'
    >,
    id?: UniqueEntityID
  ){
   const user = new User(
    id ?? new  UniqueEntityID(),
    {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null
    }
    )

    return user
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set password(password: string) {
    this.props.password = password;
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

  private touch() {
    this.props.updatedAt = new Date();
  }
}
