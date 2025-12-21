import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { Either } from "../../../core/either";
import { Recipe } from "../../../core/entities/recipe";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { RecipeRepository } from "../../repositories/recipe-repository";

interface EditRecipeUseCaseRequest {
  recipeId: UniqueEntityID;
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

    const

  }
}
