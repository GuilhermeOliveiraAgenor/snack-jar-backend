import { UniqueEntityID } from "../../core/domain/value-objects/unique-entity-id";
import { Category } from "../../core/entities/category";
import { Prisma, Category as PrismaCategory } from "@prisma/client";

export class PrismaCategoryMapper {
  static toDomain(raw: PrismaCategory): Category {
    // return created object with fields
    return Category.create(
      {
        name: raw.name,
        description: raw.description,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPersistency(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id.toString(),
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
