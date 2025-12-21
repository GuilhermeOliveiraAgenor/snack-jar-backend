import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface EditRecipeUseCaseRequest {
  recipeId: string;
  title: Recipe["title"];
  description: Recipe["description"];
  preparationTime: Recipe["preparationTime"];
}

type EditRecipeUseCaseResponse = Either<
  NotFoundError,
  {
    recipe: Recipe;
  }
>;

export class EditRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}
  async execute({
    recipeId,
    title,
    description,
    preparationTime,
  }: EditRecipeUseCaseRequest): Promise<EditRecipeUseCaseResponse> {
    // verify if exists recipe
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    recipe.title = title ?? recipe.title;
    recipe.description = description ?? recipe.description;
    recipe.preparationTime = preparationTime ?? recipe.preparationTime;

    await this.recipeRepository.create(recipe);

    return success({
      recipe,
    });
  }
}
