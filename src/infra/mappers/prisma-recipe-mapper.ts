import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Recipe } from "../../core/entities/recipe";
import { Prisma, Recipe as PrismaRecipe, User } from "@prisma/client";
import { RecipeStatus } from "../../core/enum/enum-status";

export class PrismaRecipeMapper {
  static toDomain(raw: PrismaRecipe): Recipe {
    return Recipe.create(
      {
        title: raw.title,
        description: raw.description,
        preparationTime: raw.preparationTime,
        status: RecipeStatus.ACTIVE,
        categoryId: new UniqueEntityID(raw.categoryId),
        createdBy: new UniqueEntityID(raw.createdBy),
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
