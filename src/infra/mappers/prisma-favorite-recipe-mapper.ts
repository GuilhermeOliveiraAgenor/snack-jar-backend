import { Prisma, FavoriteRecipe as PrismaFavoriteRecipe } from "@prisma/client";
import { FavoriteRecipe } from "../../core/entities/favoriteRecipe";
import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";

export class PrismaFavoriteRecipeMapper {
  static toDomain(raw: PrismaFavoriteRecipe): FavoriteRecipe {
    return FavoriteRecipe.create(
      {
        recipeId: new UniqueEntityID(raw.recipeId),
        createdBy: new UniqueEntityID(raw.createdBy),
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPersistency(raw: FavoriteRecipe): Prisma.FavoriteRecipeUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      recipeId: raw.recipeId.toString(),
      createdBy: raw.createdBy.toString(),
      createdAt: raw.createdAt,
      deletedAt: raw.deletedAt,
    };
  }
}
