import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";
import { RecipeStatus } from "../enum/enum-status";

export interface RecipeProps {
  title: string;
  description: string;
  preparationTime: number;
  status: RecipeStatus;
  categoryId: UniqueEntityID;
  createdAt: Date | null;
  createdBy: UniqueEntityID;
  updatedAt: Date | null;
  updatedBy: UniqueEntityID | null;
  deletedAt: Date | null;
  deletedBy: UniqueEntityID | null;
}

export class Recipe {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: RecipeProps,
  ) {}

  static create(
    props: {
      title: string;
      description: string;
      preparationTime: number;
      status: RecipeStatus;
      categoryId: UniqueEntityID;
      createdBy: UniqueEntityID;
    },
    id?: UniqueEntityID,
  ) {
    const recipe = new Recipe(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      createdBy: props.createdBy,
      updatedBy: null,
      deletedBy: null,
    });

    return recipe;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get preparationTime() {
    return this.props.preparationTime;
  }

  get status() {
    return this.props.status;
  }

  get categoryId() {
    return this.props.categoryId;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date | null {
    return this.props.updatedAt;
  }

  get createdBy(): UniqueEntityID | null {
    return this.props.createdBy;
  }
  get updatedBy(): UniqueEntityID | null {
    return this.props.updatedBy;
  }

  get deletedBy(): UniqueEntityID | null {
    return this.props.deletedBy;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  set description(description: string) {
    this.props.description = description;
    this.touch();
  }

  set preparationTime(preparationTime: number) {
    this.props.preparationTime = preparationTime;
    this.touch();
  }

  set status(status: RecipeStatus) {
    this.props.status = status;
    this.touch();
  }

  set categoryId(categoryId: UniqueEntityID) {
    this.props.categoryId = categoryId;
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

  set createdBy(createdBy: UniqueEntityID) {
    this.props.createdBy = createdBy;
    this.touch();
  }

  set updatedBy(updatedBy: UniqueEntityID) {
    this.props.updatedBy = updatedBy;
    this.touch();
  }

  set deletedBy(deletedBy: UniqueEntityID) {
    this.props.deletedBy = deletedBy;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
  // soft delete function
  inactivate() {
    this.props.status = RecipeStatus.INACTIVE;
    this.props.deletedAt = new Date();
  }
}
