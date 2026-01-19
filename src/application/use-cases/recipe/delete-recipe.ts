import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either, failure, success } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotAllowedError } from "../../errors/not-allowed-error";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface DeleteRecipeRequest {
  id: string;
  deletedBy: string;
}

type DeleteRecipeResponse = Either<
  NotFoundError | NotAllowedError,
  {
    recipe: Recipe;
  }
>;

export class DeleteRecipeUseCase {
  constructor(private recipeRepository: RecipeRepository) {}

  async execute({ id, deletedBy }: DeleteRecipeRequest): Promise<DeleteRecipeResponse> {
    // verify if exists recipe
    const recipe = await this.recipeRepository.findById(id);
    if (!recipe) {
      return failure(new NotFoundError("recipe"));
    }

    if (recipe.createdBy.toString() != deletedBy) {
      return failure(new NotAllowedError("user"));
    }
    // inactive recipe
    recipe.inactivate();
    recipe.deletedBy = new UniqueEntityID(deletedBy);

    await this.recipeRepository.save(recipe);
    return success({
      recipe,
    });
  }
}
