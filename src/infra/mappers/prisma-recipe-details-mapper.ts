import {
  Recipe as PrismaRecipe,
  RecipeIngredient as PrismaRecipeIngredient,
  RecipeStep as PrismaRecipeStep,
} from "@prisma/client";

type PrismaRecipeDetails = PrismaRecipe & {
  ingredients: PrismaRecipeIngredient[];
  steps: PrismaRecipeStep[];
};
export class PrismaRecipeDetailsMapper {
  static toDomain(raw: PrismaRecipeDetails) {
    return {
      id: raw.id.toString(),

      ingredients: raw.ingredients.map((ingredient) => ({
        id: ingredient.id.toString(),
        ingredient: ingredient.ingredient,
        amount: ingredient.amount,
        unit: ingredient.unit,
        recipeId: ingredient.recipeId.toString(),
        createdAt: ingredient.createdAt,
        createdBy: ingredient.createdBy.toString(),
        updatedAt: ingredient.updatedAt,
        updatedBy: ingredient.updatedBy ? ingredient.updatedBy.toString() : null,
      })),

      steps: raw.steps.map((step) => ({
        id: step.id.toString(),
        step: step.step,
        description: step.description,
        recipeId: step.recipeId.toString(),
        createdAt: step.createdAt,
        createdBy: step.createdBy.toString(),
        updatedAt: step.updatedAt,
        updatedBy: step.updatedBy ? step.updatedBy.toString() : null,
      })),
    };
  }
}
