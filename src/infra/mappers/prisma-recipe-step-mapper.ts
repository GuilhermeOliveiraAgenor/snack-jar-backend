import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Prisma, RecipeStep as PrismaRecipeStep } from "@prisma/client";
import { RecipeStep } from "../../core/entities/recipeStep";

export class PrismaRecipeStepStepMapper {
  static toDomain(raw: PrismaRecipeStep): RecipeStep {
    return RecipeStep.create(
      {
        step: raw.step,
        description: raw.description,
        recipeId: new UniqueEntityID(raw.recipeId),
        createdBy: new UniqueEntityID(raw.createdBy),
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
      createdBy: raw.createdBy.toString(),
      updatedBy: raw.updatedBy ? raw.updatedBy.toString() : null,
      deletedBy: raw.deletedBy ? raw.deletedBy.toString() : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    };
  }
}
