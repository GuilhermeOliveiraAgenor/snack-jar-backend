import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { AlreadyExistsError } from "../../errors/already-exists-error";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";
import { UserRepository } from "../../repositories/user-repository";

interface EditRecipeUseCaseRequest {
  id: string;
  title?: Recipe["title"];
  description?: Recipe["description"];
  preparationTime?: Recipe["preparationTime"];
  updatedBy: string;
}

type EditRecipeUseCaseResponse = Either<
  NotFoundError | NotAllowedError | AlreadyExistsError | InvalidCredentialsError,
  {
    recipe: Recipe;
  }
>;

export class EditRecipeUseCase {
  constructor(
    private recipeRepository: RecipeRepository,
    private userRepository: UserRepository,
  ) {}
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

    const user = await this.userRepository.findById(updatedBy);
    if (!user) {
      return failure(new NotFoundError("user"));
    }

    if (recipe.createdBy.toString() != updatedBy) {
      return failure(new NotAllowedError("user"));
    }

    if (title) {
      const alreadyExists = await this.recipeRepository.findManyByTitle(title, updatedBy);

      if (alreadyExists.length > 0) {
        return failure(new AlreadyExistsError("recipe"));
      }
    }

    if (preparationTime !== undefined && preparationTime <= 0) {
      return failure(new InvalidCredentialsError("recipe"));
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
