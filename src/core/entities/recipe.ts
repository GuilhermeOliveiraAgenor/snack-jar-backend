import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface RecipeProps {
  title: string;
  description: string;
  preparationTime: number;
  categoryId: UniqueEntityID;
  statusId: UniqueEntityID;
  userId: UniqueEntityID;
  createdAt: Date | null;
  createdBy: UniqueEntityID | null;
  updatedAt: Date | null;
  updatedBy: UniqueEntityID | null;
  deletedAt: Date | null;
  deletedBy: UniqueEntityID | null;
}

export class Recipe {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: RecipeProps,
  ) {
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? null;
    this.props.deletedAt = props.deletedAt ?? null;
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

  get categoryId() {
    return this.props.categoryId;
  }

  get statusId() {
    return this.props.statusId;
  }

  get userId() {
    return this.props.userId;
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

  set categoryId(categoryId: UniqueEntityID) {
    this.props.categoryId = categoryId;
    this.touch();
  }

  set statusId(statusId: UniqueEntityID) {
    this.props.statusId = statusId;
    this.touch();
  }

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId;
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
}
