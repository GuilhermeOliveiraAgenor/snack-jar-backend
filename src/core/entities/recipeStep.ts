import { update } from "ramda";
import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";
import { Optional } from "../types/optional";

export interface RecipeStepProps {
  step: number;
  description: string;
  recipeId: UniqueEntityID;
  createdAt: Date;
  createdBy: UniqueEntityID;
  updatedAt: Date | null;
  updatedBy: UniqueEntityID | null;
}

export class RecipeStep {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: RecipeStepProps,
  ) {}

  static create(
    props: Optional<
    RecipeStepProps, 'createdAt' | 'updatedAt' | 'updatedBy' >,
    id?: UniqueEntityID
  ){
    const recipeStep = new RecipeStep(
      id ?? new UniqueEntityID(),
    {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      updatedBy: props.updatedBy ?? null
    },
    )
    return recipeStep
  }

  get id() {
    return this._id;
  }

  get step() {
    return this.props.step;
  }

  get description() {
    return this.props.description;
  }

  get recipeId() {
    return this.props.recipeId;
  }

  get createdBy(): UniqueEntityID {
    return this.props.createdBy;
  }
  get updatedBy(): UniqueEntityID | null {
    return this.props.updatedBy;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  set step(step: number) {
    this.props.step = step;
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
