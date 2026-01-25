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
    recipeId: string,
    page: number,
    perPage: number,
  ): Promise<{ recipeSteps: RecipeStep[]; totalCount: number }> {
    const skip = (page - 1) * perPage;

    const [totalCount, recipeSteps] = await Promise.all([
      this.prisma.recipeStep.count(),
      this.prisma.recipeStep.findMany({
        where: {
          recipeId,
        },
        orderBy: { createdAt: "asc" },
        skip,
        take: perPage,
      }),
    ]);
    return {
      recipeSteps: recipeSteps.map((raw) => PrismaRecipeStepMapper.toDomain(raw)),
      totalCount,
    };
  }
  async findByRecipeId(recipeId: string): Promise<RecipeStep[]> {
    const recipeSteps = await this.prisma.recipeStep.findMany({
      where: { recipeId },
    });
    return recipeSteps.map(PrismaRecipeStepMapper.toDomain);
  }
  async delete(recipeStep: RecipeStep): Promise<void> {
    await this.prisma.recipeStep.delete({
      where: {
        id: recipeStep.id.toString(),
      },
    });
  }
  async findByRecipeIdAndStep(recipeId: string, step: number): Promise<RecipeStep | null> {
    const recipeStep = await this.prisma.recipeStep.findFirst({
      where: {
        recipeId,
        step,
      },
    });
    if (!recipeStep) return null;
    return PrismaRecipeStepMapper.toDomain(recipeStep);
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
