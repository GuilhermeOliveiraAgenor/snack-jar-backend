import { PrismaClient } from "@prisma/client";
import { RecipeDetailsRepository } from "../../application/repositories/recipe-details-repository";
import { Recipe } from "../../core/entities/recipe";
import { RecipeIngredient } from "../../core/entities/recipeIngredient";
import { RecipeStep } from "../../core/entities/recipeStep";
import { PrismaRecipeDetailsMapper } from "../mappers/prisma-recipe-details-mapper";

export class PrismaRecipeDetailsRepository implements RecipeDetailsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getDetailsByRecipeId(
    recipeId: string,
  ): Promise<{ recipe: Recipe; steps: RecipeStep[]; ingredients: RecipeIngredient[] } | null> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        category: true,
        recipeIngredient: true,
        recipeStep: {
          orderBy: { step: "asc" },
        },
      },
    });

    if (!recipe) return null;

    return PrismaRecipeDetailsMapper.toDomain(recipe);
  }
}
