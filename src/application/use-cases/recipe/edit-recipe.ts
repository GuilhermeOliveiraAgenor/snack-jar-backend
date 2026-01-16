import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface EditRecipeUseCaseRequest {
  id: string;
  title?: Recipe["title"];
  description?: Recipe["description"];
  preparationTime?: Recipe["preparationTime"];
  updatedBy: string;
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
    id,
    title,
    description,
    preparationTime,
    updatedBy,
  }: EditRecipeUseCaseRequest): Promise<EditRecipeUseCaseResponse> {
    // verify if exists recipe
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    recipe.title = title ?? recipe.title;
    recipe.description = description ?? recipe.description;
    recipe.preparationTime = preparationTime ?? recipe.preparationTime;
    recipe.updatedBy = new UniqueEntityID(updatedBy);

    // pass to repository
    await this.recipeRepository.save(recipe);

    return success({
      recipe,
    });
  }
}
