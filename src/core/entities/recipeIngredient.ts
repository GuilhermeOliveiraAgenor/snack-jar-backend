import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";
import { MeasurementUnit } from "../enum/measurement-unit";
import { Optional } from "../types/optional";

export interface RecipeIngredientProps {
  ingredient: string;
  amount: string;
  unit: MeasurementUnit;
  recipeId: UniqueEntityID;
  createdAt: Date;
  createdBy: UniqueEntityID;
  updatedAt: Date | null;
  updatedBy: UniqueEntityID | null;
}

export class RecipeIngredient {
  constructor(
    private _id: UniqueEntityID,
    private props: RecipeIngredientProps,
  ) {}

  static create(
    props: Optional<RecipeIngredientProps, "createdAt" | "updatedAt" | "updatedBy">,
    id?: UniqueEntityID,
  ) {
    const recipeIngredient = new RecipeIngredient(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      updatedBy: props.updatedBy ?? null,
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get createdBy(): UniqueEntityID {
    return this.props.createdBy;
  }
  get updatedBy(): UniqueEntityID | null {
    return this.props.updatedBy;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  set ingredient(ingredient: string) {
    this.props.ingredient = ingredient;
    this.touch();
  }

  set amount(amount: string) {
    this.props.amount = amount;
    this.touch();
  }

  set unit(unit: MeasurementUnit) {
    this.props.unit = unit;
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

  set createdBy(createdBy: UniqueEntityID) {
    this.props.createdBy = createdBy;
    this.touch();
  }

  set updatedBy(updatedBy: UniqueEntityID) {
    this.props.updatedBy = updatedBy;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
