import { PrismaClient } from "@prisma/client";
import { CategoryRepository } from "../../application/repositories/category-repository";
import { Category } from "../../core/entities/category";
import { PrismaCategoryMapper } from "../mappers/prisma-category-mapper";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: PrismaCategoryMapper.toPersistency(category),
    });
  }
  async save(category: Category): Promise<void> {
    await this.prisma.category.update({
      where: { id: category.id.toString() },
      data: PrismaCategoryMapper.toPersistency(category),
    });
  }
  async findMany(
    page: number,
    perPage: number,
  ): Promise<{ categories: Category[]; totalCount: number }> {
    const skip = (page - 1) * perPage;

    const [totalCount, categories] = await Promise.all([
      this.prisma.category.count(),
      this.prisma.category.findMany({
        skip,
        take: perPage,
      }),
    ]);
    return {
      categories: categories.map((raw) => PrismaCategoryMapper.toDomain(raw)),
      totalCount,
    };
  }
  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: { name },
    });
    if (!category) return null;
    return PrismaCategoryMapper.toDomain(category);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category) return null;
    return PrismaCategoryMapper.toDomain(category);
  }
}
