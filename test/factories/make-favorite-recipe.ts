import { FavoriteRecipeProps, FavoriteRecipe } from "../../src/core/entities/favoriteRecipe";
import { UniqueEntityID } from "../../src/core/domain/value-objects/unique-entity-id";

export function makeFavoriteRecipe(override?: Partial<FavoriteRecipeProps>) {
  return FavoriteRecipe.create({
    recipeId: new UniqueEntityID(),
    createdBy: new UniqueEntityID(),
    ...override,
  });
}
