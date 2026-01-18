import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { InvalidFieldsError } from "../../errors/invalid-fields-error";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface EditRecipeUseCaseRequest {
  id: string;
  title?: Recipe["title"] | undefined;
  description?: Recipe["description"] | undefined;
  preparationTime?: Recipe["preparationTime"] | undefined;
  updatedBy: string;
}

type EditRecipeUseCaseResponse = Either<
  NotFoundError | NotAllowedError | AlreadyExistsError | InvalidFieldsError,
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

    if (recipe.createdBy.toString() != updatedBy) {
      return failure(new NotAllowedError("user"));
    }

    if (title) {
      const alreadyExists = await this.recipeRepository.findByTitle(updatedBy, title);

      if (alreadyExists && alreadyExists.id.toString() != id) {
        return failure(new AlreadyExistsError("recipe"));
      }
    }

    if (preparationTime !== undefined && preparationTime <= 0) {
      return failure(new InvalidFieldsError("recipe"));
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
