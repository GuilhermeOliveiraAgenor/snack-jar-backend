import { PrismaClient } from "@prisma/client";
import { RecipeIngredientRepository } from "../../application/repositories/recipe-ingredient-repository";
import { RecipeIngredient } from "../../core/entities/recipeIngredient";
import { PrismaRecipeIngredientMapper } from "../mappers/prisma-recipe-ingredient-mapper";

export class PrismaRecipeIngredientRepository implements RecipeIngredientRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async createMany(recipeIngredient: RecipeIngredient[]): Promise<void> {
    const data = recipeIngredient.map((recipe) =>
      PrismaRecipeIngredientMapper.toPersistency(recipe),
    );
    await this.prisma.recipeIngredient.createMany({
      data,
    });
  }
  async create(recipeIngredient: RecipeIngredient): Promise<void> {
    await this.prisma.recipeIngredient.create({
      data: PrismaRecipeIngredientMapper.toPersistency(recipeIngredient),
    });
  }
  async save(recipeIngredient: RecipeIngredient): Promise<void> {
    await this.prisma.recipeIngredient.update({
      where: {
        id: recipeIngredient.id.toString(),
      },
      data: PrismaRecipeIngredientMapper.toPersistency(recipeIngredient),
    });
  }
  async delete(recipeIngredient: RecipeIngredient): Promise<void> {
    await this.prisma.recipeIngredient.delete({
      where: {
        id: recipeIngredient.id.toString(),
      },
    });
  }
  async findManyByRecipeId(id: string): Promise<RecipeIngredient[]> {
    const recipeIngredients = await this.prisma.recipeIngredient.findMany({
      where: {
        recipeId: id,
      },
    });
    return recipeIngredients.map(PrismaRecipeIngredientMapper.toDomain);
  }
  async findById(id: string): Promise<RecipeIngredient | null> {
    const recipeIngredient = await this.prisma.recipeIngredient.findUnique({
      where: { id },
    });
    if (!recipeIngredient) return null;
    return PrismaRecipeIngredientMapper.toDomain(recipeIngredient);
  }
}
