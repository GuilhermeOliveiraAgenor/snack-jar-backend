import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface RecipeIngredientProps {
  ingredient: string;
  amount: string;
  unit: string;
  recipeId: UniqueEntityID;
  createdAt: Date | null;
  createdBy: UniqueEntityID;
  updatedAt: Date | null;
  updatedBy: UniqueEntityID | null;
  deletedAt: Date | null;
  deletedBy: UniqueEntityID | null;
}

export class RecipeIngredient {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: RecipeIngredientProps,
  ) {}

  static create(
    props: {
      ingredient: string;
      amount: string;
      unit: string;
      recipeId: UniqueEntityID;
      createdBy: UniqueEntityID;
    },
    id?: UniqueEntityID,
  ) {
    const recipeIngredient = new RecipeIngredient(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      createdBy: props.createdBy,
      updatedBy: null,
      deletedBy: null,
    });

    return recipeIngredient;
  }

  get id() {
    return this._id;
  }

  get ingredient() {
    return this.props.ingredient;
  }

  get amount() {
    return this.props.amount;
  }

  get unit() {
    return this.props.unit;
  }

  get recipeId() {
    return this.props.recipeId;
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
