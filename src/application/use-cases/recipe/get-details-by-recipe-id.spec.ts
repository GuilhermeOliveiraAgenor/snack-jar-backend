import { describe, beforeEach, it, expect } from "vitest";
import { makeRecipe } from "../../../../test/factories/make-recipe";
import { InMemoryRecipeRepository } from "../../../../test/repositories/in-memory-recipe-repository";
import { InMemoryRecipeIngredientRepository } from "../../../../test/repositories/in-memory-recipe-ingredient";
import { InMemoryRecipeStepRepository } from "../../../../test/repositories/in-memory-recipe-step";
import { GetDetailsByRecipeIdUseCase } from "./get-details-by-recipe-id";
import { makeRecipeIngredient } from "../../../../test/factories/make-recipe-ingredient";
import { makeRecipeStep } from "../../../../test/factories/make-recipe-step";
import { InMemoryRecipeDetailsRepository } from "../../../../test/repositories/in-memory-recipe-details-repository";
import { UniqueEntityID } from "../../../core/domain/value-objects/unique-entity-id";
import { NotFoundError } from "../../errors/resource-not-found-error";
import { InMemoryUserRepository } from "../../../../test/repositories/in-memory-user-repository";
import { makeUser } from "../../../../test/factories/make-user";

let inMemoryRecipeRepository: InMemoryRecipeRepository
let inMemoryRecipeIngredientRepository: InMemoryRecipeIngredientRepository
let inMemoryRecipeStepRepository: InMemoryRecipeStepRepository
let inMemoryRecipeDetailsRepository: InMemoryRecipeDetailsRepository
let inMemoryUserRepository: InMemoryUserRepository

let sut: GetDetailsByRecipeIdUseCase

describe("Get Details By Recipe Id Use Case", () => {
    beforeEach(() =>{
    inMemoryRecipeRepository = new InMemoryRecipeRepository()
    inMemoryRecipeIngredientRepository = new InMemoryRecipeIngredientRepository()
    inMemoryRecipeStepRepository = new InMemoryRecipeStepRepository()
    inMemoryRecipeDetailsRepository = new InMemoryRecipeDetailsRepository(inMemoryRecipeRepository, inMemoryRecipeIngredientRepository, inMemoryRecipeStepRepository, inMemoryUserRepository)
    inMemoryUserRepository = new InMemoryUserRepository()

        sut = new GetDetailsByRecipeIdUseCase(inMemoryRecipeDetailsRepository)

    })
    it("should be able to get details by recipe id", async() =>{
        const recipe = makeRecipe()
        await inMemoryRecipeRepository.create(recipe)

        const user = makeUser()
        await inMemoryUserRepository.create(user)

        const recipeIngredient = makeRecipeIngredient({
            recipeId: recipe.id
        })
        await inMemoryRecipeIngredientRepository.create(recipeIngredient)

        const recipeStep = makeRecipeStep({
            recipeId: recipe.id
        })
        await inMemoryRecipeStepRepository.create(recipeStep)

        const result = await sut.execute({
            recipeId: recipe.id.toString(),
            userId: user.id.toString()
        })

        expect(result.isSuccess()).toBe(true)
        if(result.isSuccess()){
            expect(result.value.steps).toHaveLength(1)
            expect(result.value.ingredients).toHaveLength(1)
            expect(result.value.steps).toHaveLength(1)
        }
    })
    it("should be able to get details when recipe id does not exists", async() =>{
        
        const user = makeUser()
        await inMemoryUserRepository.create(user)

        const recipe = makeRecipe()
        await inMemoryRecipeRepository.create(recipe)
   
        const result = await sut.execute({
            recipeId: "0",
            userId: user.id.toString()
        })

        expect(result.isError()).toBe(true)
        expect(result.value).toBeInstanceOf(NotFoundError)
    })
})

