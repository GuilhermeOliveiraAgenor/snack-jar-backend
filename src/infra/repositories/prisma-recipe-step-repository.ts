import { PrismaClient } from "@prisma/client";
import { RecipeStepRepository } from "../../application/repositories/recipe-step-repository";
import { RecipeStep } from "../../core/entities/recipeStep";
import { PrismaRecipeStepMapper } from "../mappers/prisma-recipe-step-mapper";

export class PrismaRecipeStepRepository implements RecipeStepRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createMany(recipeStep: RecipeStep[]): Promise<void> {
    const data = recipeStep.map((step) => PrismaRecipeStepMapper.toPersistency(step));
    await this.prisma.recipeStep.createMany({
      data,
    });
  }
  async create(recipeStep: RecipeStep): Promise<void> {
    await this.prisma.recipeStep.create({
      data: PrismaRecipeStepMapper.toPersistency(recipeStep),
    });
  }
  async save(recipeStep: RecipeStep): Promise<void> {
    await this.prisma.recipeStep.update({
      where: {
        id: recipeStep.id.toString(),
      },
      data: PrismaRecipeStepMapper.toPersistency(recipeStep),
    });
  }
  async findManyByRecipeId(
    id: string,
    page: number,
    perPage: number,
  ): Promise<{ recipeSteps: RecipeStep[]; totalCount: number }> {
    const skip = (page - 1) * perPage;

    const [totalCount, recipeSteps] = await Promise.all([
      this.prisma.recipeStep.count(),
      this.prisma.recipeStep.findMany({
        where: {
          recipeId: id,
        },
        orderBy: { step: "asc" },
        skip,
        take: perPage,
      }),
    ]);
    return {
      recipeSteps: recipeSteps.map((raw) => PrismaRecipeStepMapper.toDomain(raw)),
      totalCount,
    };
  }
  async delete(recipeStep: RecipeStep): Promise<void> {
    await this.prisma.recipeStep.delete({
      where: {
        id: recipeStep.id.toString(),
      },
    });
  }

  async findById(id: string): Promise<RecipeStep | null> {
    const recipeStep = await this.prisma.recipeStep.findUnique({
      where: { id },
    });
    if (!recipeStep) {
      return null;
    }
    return PrismaRecipeStepMapper.toDomain(recipeStep);
  }
}
