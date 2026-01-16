import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Prisma, RecipeIngredient as PrismaRecipeIngredient } from "@prisma/client";
import { RecipeIngredient } from "../../core/entities/recipeIngredient";

export class PrismaRecipeIngredientMapper {
  static toDomain(raw: PrismaRecipeIngredient): RecipeIngredient {
    return RecipeIngredient.create(
      {
        ingredient: raw.ingredient,
        amount: raw.amount,
        unit: raw.unit,
        recipeId: new UniqueEntityID(raw.recipeId),
        createdBy: new UniqueEntityID(raw.createdBy),
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPersistency(raw: RecipeIngredient): Prisma.RecipeIngredientUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      ingredient: raw.ingredient,
      amount: raw.amount,
      unit: raw.unit,
      recipeId: raw.recipeId.toString(),
      createdBy: raw.createdBy.toString(),
      updatedBy: raw.updatedBy ? raw.updatedBy.toString() : null,
      deletedBy: raw.deletedBy ? raw.deletedBy.toString() : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    };
  }
}
