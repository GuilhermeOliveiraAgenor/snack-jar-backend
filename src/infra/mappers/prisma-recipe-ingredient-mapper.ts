import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Prisma, RecipeIngredient as PrismaRecipeIngredient } from "@prisma/client";
import { RecipeIngredient } from "../../core/entities/recipeIngredient";
import { MeasurementUnit } from "../../core/enum/measurement-unit";

export class PrismaRecipeIngredientMapper {
  static toDomain(raw: PrismaRecipeIngredient): RecipeIngredient {
    return RecipeIngredient.create(
      {
        ingredient: raw.ingredient,
        amount: raw.amount,
        unit: raw.unit as MeasurementUnit,
        recipeId: new UniqueEntityID(raw.recipeId),
        createdAt: raw.createdAt,
        createdBy: new UniqueEntityID(raw.createdBy),
        updatedAt: raw.updatedAt,
        updatedBy: raw.updatedBy ? new UniqueEntityID(raw.updatedBy) : null,
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
      createdAt: raw.createdAt,
      createdBy: raw.createdBy.toString(),
      updatedAt: raw.updatedAt,
      updatedBy: raw.updatedBy ? raw.updatedBy.toString() : null,
    };
  }
}
