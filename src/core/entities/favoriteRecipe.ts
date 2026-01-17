import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface FavoriteRecipeProps {
  recipeId: UniqueEntityID;
  createdAt: Date | null;
  deletedAt: Date | null;
  createdBy: UniqueEntityID;
  deletedBy: UniqueEntityID | null;
}

export class FavoriteRecipe {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: FavoriteRecipeProps,
  ) {}

  static create(
    props: { recipeId: UniqueEntityID; createdBy: UniqueEntityID },
    id?: UniqueEntityID,
  ) {
    const favoriteRecipe = new FavoriteRecipe(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: new Date(),
      deletedAt: null,
      createdBy: props.createdBy,
      deletedBy: null,
    });
    return favoriteRecipe;
  }

  get id() {
    return this._id;
  }

  get recipeId() {
    return this.props.recipeId;
  }

  get createdBy(): UniqueEntityID {
    return this.props.createdBy;
  }

  get deletedBy(): UniqueEntityID | null {
    return this.props.deletedBy;
  }

  get createdAt(): Date | null {
    return this.props.createdAt;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  set recipeId(recipeId: UniqueEntityID) {
    this.props.recipeId = recipeId;
  }

  set createdBy(createdBy: UniqueEntityID) {
    this.props.createdBy = createdBy;
  }

  set deletedBy(deletedBy: UniqueEntityID) {
    this.props.deletedBy = deletedBy;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
  }
}
