import { UniqueEntityID } from "../domain/value-objects/unique-entity-id";
import { Optional } from "../types/optional";

export interface FavoriteRecipeProps {
  recipeId: UniqueEntityID;
  createdAt: Date;
  createdBy: UniqueEntityID;
}

export class FavoriteRecipe {
  constructor(
    private readonly _id: UniqueEntityID,
    private props: FavoriteRecipeProps,
  ) {}

  static create(props: Optional<FavoriteRecipeProps, "createdAt">, id?: UniqueEntityID) {
    const favoriteRecipe = new FavoriteRecipe(id ?? new UniqueEntityID(), {
      ...props,
      createdAt: props.createdAt ?? new Date(),
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set recipeId(recipeId: UniqueEntityID) {
    this.props.recipeId = recipeId;
  }

  set createdBy(createdBy: UniqueEntityID) {
    this.props.createdBy = createdBy;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }
}
