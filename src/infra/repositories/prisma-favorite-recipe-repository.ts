import { PrismaClient } from "@prisma/client";
import { FavoriteRecipeRepository } from "../../application/repositories/favorite-recipe-repository";
import { FavoriteRecipe } from "../../core/entities/favoriteRecipe";
import { PrismaFavoriteRecipeMapper } from "../mappers/prisma-favorite-recipe-mapper";
import { PrismaRecipeStepMapper } from "../mappers/prisma-recipe-step-mapper";


export class PrismaFavoriteRecipeRepository implements FavoriteRecipeRepository{
    constructor (private readonly prisma: PrismaClient){}
    async create(favoriteRecipe: FavoriteRecipe): Promise<void> {
        await this.prisma.favoriteRecipe.create({
            data: PrismaFavoriteRecipeMapper.toPersistency(favoriteRecipe)
        })
    }
    async delete(favoriteRecipe: FavoriteRecipe): Promise<void> {
        await this.prisma.favoriteRecipe.delete({
            where: {
                id: favoriteRecipe.id.toString(),
            }
        })
    }
    async findManyByUserId(id: string): Promise<FavoriteRecipe[]> {
        const favoriteRecipe = await this.prisma.favoriteRecipe.findMany({
            where: {
                userId: id
            }
        })
        return favoriteRecipe.map(PrismaRecipeStepMapper.toDomain)  
    }
    async findById(id: string): Promise<FavoriteRecipe | null> {
        const favoriteRecipe = await this.prisma.favoriteRecipe.findUnique({
            where: {id}
        })
        if(!favoriteRecipe) return null
        return PrismaFavoriteRecipeMapper.toDomain(favoriteRecipe)
    }

}


