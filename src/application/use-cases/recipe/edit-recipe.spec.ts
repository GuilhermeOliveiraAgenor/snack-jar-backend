import { beforeEach, describe } from "vitest";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { EditRecipeUseCase } from "./edit-recipe";

let inMemoryRecipeRepository: InMemoryRecipeRepository;
let sut: EditRecipeUseCase;

describe("Edit Recipe Use Case", () => {
  beforeEach(() => {
    inMemoryRecipeRepository = new InMemoryRecipeRepository();
    sut = new EditRecipeUseCase(inMemoryRecipeRepository);
  });
  it("should edit a recipe");
});
