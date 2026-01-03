import { PrismaClient } from "@prisma/client";
import { RecipeRepository } from "../../application/repositories/recipe-repository";
import { Recipe } from "../../core/entities/recipe";
import { PrismaRecipeMapper } from "../mappers/prisma-recipe-mapper";

export class PrismaRecipeRepository implements RecipeRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(recipe: Recipe): Promise<void> {
    await this.prisma.recipe.create({
      data: PrismaRecipeMapper.toPersistency(recipe),
    });
  }
  async save(recipe: Recipe): Promise<void> {
    await this.prisma.recipe.update({
      where: { id: recipe.id.toString() },
      data: PrismaRecipeMapper.toPersistency(recipe),
    });
  }
  async findManyByUserId(id: string): Promise<Recipe[]> {
    const recipes = await this.prisma.recipe.findMany({
      where: { createdBy: id },
    });
    return recipes.map(PrismaRecipeMapper.toDomain);
  }
  async findById(id: string): Promise<Recipe | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });
    if (!recipe) return null;
    return PrismaRecipeMapper.toDomain(recipe);
  }
}
