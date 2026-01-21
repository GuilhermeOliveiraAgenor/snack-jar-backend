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
        status: raw.id as RecipeStatus,
        categoryId: new UniqueEntityID(raw.categoryId),
        createdBy: new UniqueEntityID(raw.createdBy),
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
      createdBy: raw.createdBy.toString(),
      updatedBy: raw.updatedBy ? raw.updatedBy.toString() : null,
      deletedBy: raw.deletedBy ? raw.deletedBy.toString() : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    };
  }
}
