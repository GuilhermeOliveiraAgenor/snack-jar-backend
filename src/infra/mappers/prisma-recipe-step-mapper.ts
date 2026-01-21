import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Prisma, RecipeStep as PrismaRecipeStep } from "@prisma/client";
import { RecipeStep } from "../../core/entities/recipeStep";

export class PrismaRecipeStepMapper {
  static toDomain(raw: PrismaRecipeStep): RecipeStep {
    return RecipeStep.create(
      {
        step: raw.step,
        description: raw.description,
        recipeId: new UniqueEntityID(raw.recipeId),
        createdAt: raw.createdAt,
        createdBy: new UniqueEntityID(raw.createdBy),
        updatedAt: raw.updatedAt,
        updatedBy: raw.updatedBy ? new UniqueEntityID(raw.updatedBy) : null,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPersistency(raw: RecipeStep): Prisma.RecipeStepUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      step: raw.step,
      description: raw.description,
      recipeId: raw.recipeId.toString(),
      createdAt: raw.createdAt,
      createdBy: raw.createdBy.toString(),
      updatedAt: raw.updatedAt,
      updatedBy: raw.updatedBy ? raw.updatedBy.toString() : null,
    };
  }
}
