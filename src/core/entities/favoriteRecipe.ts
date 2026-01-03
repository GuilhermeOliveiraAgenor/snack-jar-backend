import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";

export interface FavoriteRecipeProps {
  recipeId: UniqueEntityID;
  userId: UniqueEntityID;
  createdAt: Date | null;
  deletedAt: Date | null;
}

export class FavoriteRecipe {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: FavoriteRecipeProps,
  ) {}

  static create(props: { recipeId: UniqueEntityID; userId: UniqueEntityID }, id?: UniqueEntityID) {
    const favoriteRecipe = new FavoriteRecipe(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: new Date(),
      deletedAt: null,
    });
    return favoriteRecipe;
  }

  get id() {
    return this._id;
  }

  get recipeId() {
    return this.props.recipeId;
  }

  get userId() {
    return this.props.userId;
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

  set userId(userId: UniqueEntityID) {
    this.props.userId = userId;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
  }
}
