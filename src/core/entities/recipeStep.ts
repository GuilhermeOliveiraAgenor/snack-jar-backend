import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface RecipeStepProps {
  step: number;
  description: string;
  recipeId: UniqueEntityID;
  createdAt: Date | null;
  createdBy: UniqueEntityID | null;
  updatedAt: Date | null;
  updatedBy: UniqueEntityID | null;
  deletedAt: Date | null;
  deletedBy: UniqueEntityID | null;
}

export class RecipeStep {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: RecipeStepProps,
  ) {}

  static create(
    props: {
      step: number;
      description: string;
      recipeId: UniqueEntityID;
      createdBy: UniqueEntityID;
    },
    id?: UniqueEntityID,
  ) {
    const preparationMethod = new RecipeStep(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: new Date(),
      updatedAt: null,
      deletedAt: null,
      createdBy: props.createdBy,
      updatedBy: null,
      deletedBy: null,
    });

    return preparationMethod;
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
