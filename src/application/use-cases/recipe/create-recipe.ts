import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { PreparationMethodRepository } from "../../repositories/preparation-method-repository";
import { RecipeIngredientRepository } from "../../repositories/recipe-ingredient-repository";

import { RecipeRepository } from "../../repositories/recipe-repository";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { RecipeIngredient } from "../../../core/entities/recipeIngredient";
import { PreparationMethod } from "../../../core/entities/preparationMethod";
import { CategoriesRepository } from "../../repositories/categories-repository";
import { StatusRepository } from "../../repositories/status-repository";

// create request
interface CreateRecipeUseCaseRequest {
  // recipe fields
  title: Recipe["title"];
  description: Recipe["description"];
  preparationTime: Recipe["preparationTime"];
  categoryId: string;
  statusId: string;
  createdBy: string;

  // recipe ingredient list
  recipeIngredient: {
    ingredient: string;
    amount: string;
    unit: string;
  }[];

  // preparation method list
  preparationMethod: {
    step: number;
    description: string;
  }[];
}

type CreateRecipeUseCaseResponse = Either<
  NotFoundError,
  {
    recipe: Recipe;
  }
>;

export class CreateRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private recipeIngredientRepository: RecipeIngredientRepository,
    private preparationMethodRepository: PreparationMethodRepository,
    private categoryRepository: CategoriesRepository,
    private statusRepository: StatusRepository,
  ) {}

  async execute({
    title,
    description,
    preparationTime,
    categoryId,
    statusId,
    recipeIngredient,
    preparationMethod,
    createdBy,
  }: CreateRecipeUseCaseRequest): Promise<CreateRecipeUseCaseResponse> {
    // verify if exists category

    const category = await this.categoryRepository.findById(categoryId);
    if (!category) {
      return failure(new NotFoundError("category"));
    }

    // verify if exists status

    const status = await this.statusRepository.findById(statusId);
    if (!status) {
      return failure(new NotFoundError("status"));
    }
    // create recipe
    const recipe = Recipe.create({
      title,
      description,
      preparationTime,
      categoryId: new UniqueEntityID(categoryId),
      statusId: new UniqueEntityID(statusId),
      createdBy: new UniqueEntityID(createdBy),
    });

    // pass to repository
    await this.recipeRepository.create(recipe);

    // map recipe ingredient created
    const recipeIngredientToCreate = recipeIngredient.map((item) =>
      RecipeIngredient.create({
        ingredient: item.ingredient,
        amount: item.amount,
        unit: item.unit,
        recipeId: recipe.id,
        createdBy: recipe.createdBy,
      }),
    );

    await this.recipeIngredientRepository.createMany(recipeIngredientToCreate);

    // map preparation method created
    const preparationMethodToCreate = preparationMethod.map((item) =>
      PreparationMethod.create({
        step: item.step,
        description: item.description,
        recipeId: recipe.id,
        createdBy: new UniqueEntityID(createdBy),
      }),
    );

    await this.preparationMethodRepository.createMany(preparationMethodToCreate);

    return success({
      recipe,
    });
  }
}
