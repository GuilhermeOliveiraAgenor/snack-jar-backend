import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Prisma, Recipe as PrismaRecipe } from "@prisma/client";
import { Recipe } from "../../core/entities/recipe";
import { RecipeStatus } from "../../core/enum/recipe-status";

export class PrismaRecipeMapper {
  static toDomain(raw: PrismaRecipe): Recipe {
    return Recipe.create(
      {
        title: raw.title,
        description: raw.description,
        preparationTime: raw.preparationTime,
        status: raw.status as RecipeStatus,
        categoryId: new UniqueEntityID(raw.categoryId),
        createdAt: raw.createdAt,
        createdBy: new UniqueEntityID(raw.createdBy),
        updatedAt: raw.updatedAt,
        updatedBy: raw.updatedBy ? new UniqueEntityID(raw.updatedBy) : null,
        deletedAt: raw.deletedAt,
        deletedBy: raw.deletedBy ? new UniqueEntityID(raw.deletedBy) : null,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPersistency(raw: Recipe): Prisma.RecipeUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      title: raw.title,
      description: raw.description,
      preparationTime: raw.preparationTime,
      status: raw.status,
      categoryId: raw.categoryId.toString(),
      createdAt: raw.createdAt,
      createdBy: raw.createdBy.toString(),
      updatedAt: raw.updatedAt,
      updatedBy: raw.updatedBy ? raw.updatedBy.toString() : null,
      deletedAt: raw.deletedAt,
      deletedBy: raw.deletedBy ? raw.deletedBy.toString() : null,
    };
  }
}
